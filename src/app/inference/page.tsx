"use client";
import { useEffect, useRef, useState } from "react";
import { Results, Hands, HAND_CONNECTIONS, VERSION } from "@mediapipe/hands";
import {
  drawConnectors,
  drawLandmarks,
  Data,
  lerp,
} from "@mediapipe/drawing_utils";

const PREDICTION_INTERVAL = 50;
const API_URL = "http://localhost:8081/predict";

const HandsContainer = ({ setSigned }) => {
  const [inputVideoReady, setInputVideoReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [prediction, setPrediction] = useState<{
    predicted_letter: string;
    confidence: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const inputVideoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const cropCanvasRef = useRef<HTMLCanvasElement>(null);
  const lastPredictionTime = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const predictionQueueRef = useRef<string[]>([]);
  const predictionRef = useRef(null);

  useEffect(() => {
    if (!inputVideoReady) return;

    const setupVideo = async () => {
      if (!inputVideoRef.current || !canvasRef.current) return;

      contextRef.current = canvasRef.current.getContext("2d");
      const constraints = {
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 },
        },
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (inputVideoRef.current) {
          inputVideoRef.current.srcObject = stream;
        }
        sendToMediaPipe();
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setError("Failed to access webcam");
      }
    };

    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${VERSION}/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults(onResults);

    const sendToMediaPipe = async () => {
      if (!inputVideoRef.current) return;

      if (!inputVideoRef.current.videoWidth) {
        requestAnimationFrame(sendToMediaPipe);
        return;
      }

      try {
        await hands.send({ image: inputVideoRef.current });
        requestAnimationFrame(sendToMediaPipe);
      } catch (err) {
        console.error("MediaPipe error:", err);
        requestAnimationFrame(sendToMediaPipe);
      }
    };

    setupVideo();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [inputVideoReady]);

  const getBoundingBox = (landmarks: any[]) => {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    const paddingPercent = 0.1;

    landmarks.forEach((landmark) => {
      minX = Math.min(minX, landmark.x);
      minY = Math.min(minY, landmark.y);
      maxX = Math.max(maxX, landmark.x);
      maxY = Math.max(maxY, landmark.y);
    });

    const width = maxX - minX;
    const height = maxY - minY;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    const size = Math.max(width, height) * (1 + paddingPercent * 2);
    minX = centerX - size / 2;
    maxX = centerX + size / 2;
    minY = centerY - size / 2;
    maxY = centerY + size / 2;

    return {
      x: Math.max(0, Math.floor(minX * canvasRef.current!.width)),
      y: Math.max(0, Math.floor(minY * canvasRef.current!.height)),
      width: Math.min(
        canvasRef.current!.width,
        Math.floor(size * canvasRef.current!.width),
      ),
      height: Math.min(
        canvasRef.current!.height,
        Math.floor(size * canvasRef.current!.height),
      ),
    };
  };

  const processNextInQueue = async () => {
    if (isProcessing || predictionQueueRef.current.length === 0) {
      return;
    }

    setIsProcessing(true);
    const imageData = predictionQueueRef.current.shift();

    if (!imageData) {
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      if (result.error) throw new Error(result.error);
      // console.log(result);
      predictionRef.current = result;
      setSigned(result);
      setError(null);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Error sending to ASL model:", err);
        setError(err.message);
        setPrediction(null);
      }
    } finally {
      setIsProcessing(false);
      if (predictionQueueRef.current.length > 0) {
        processNextInQueue();
      }
    }
  };

  const cropAndQueueImage = (bbox) => {
    if (!cropCanvasRef.current || !contextRef.current) return;

    const currentTime = Date.now();
    if (currentTime - lastPredictionTime.current < PREDICTION_INTERVAL) return;

    lastPredictionTime.current = currentTime;

    const cropCanvas = cropCanvasRef.current;
    const cropContext = cropCanvas.getContext("2d");

    if (!cropContext) return;

    cropCanvas.width = 800;
    cropCanvas.height = 800;

    try {
      cropContext.save();
      // Flip the context horizontally to un-mirror the image
      cropContext.scale(-1, 1);

      // Adjust the x-coordinate accordingly
      cropContext.drawImage(
        canvasRef.current!,
        bbox.x,
        bbox.y,
        bbox.width,
        bbox.height,
        -cropCanvas.width, // Negative canvas width to flip the image
        0,
        cropCanvas.width,
        cropCanvas.height, // Ensure it fills the crop canvas
      );

      cropContext.restore();

      // Use PNG for better quality
      cropContext.fillStyle = "white"; // If your training data has white background
      cropContext.fillRect(0, 0, cropCanvas.width, cropCanvas.height);

      // Ensure your image is being rescaled exactly like training
      const croppedImage = cropCanvas.toDataURL("image/png");

      // console.log("Cropped Image Data:", croppedImage); // Log for debugging
      predictionQueueRef.current.push(croppedImage);
      if (!isProcessing) {
        processNextInQueue();
      }
    } catch (err) {
      console.error("Error cropping image:", err);
    }
  };

  const onResults = (results: Results) => {
    if (!canvasRef.current || !contextRef.current) return;

    setLoaded(true);
    const ctx = contextRef.current;

    ctx.save();
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw the video frame to the canvas
    ctx.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    );

    if (results.multiHandLandmarks?.[0]) {
      const landmarks = results.multiHandLandmarks[0];
      const bbox = getBoundingBox(landmarks);

      //   drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
      //     color: "#FF0000",
      //   });

      //   drawLandmarks(ctx, landmarks, {
      //     color: "#FF0000",
      //     fillColor: "#00FF00",
      //     radius: (data: Data) => lerp(data.from!.z!, -0.15, 0.1, 10, 1),
      //   });

      ctx.strokeStyle = "#00FF00";
      ctx.lineWidth = 2;
      ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);

      //   if (predictionRef.current) {
      //     const currentPrediction = predictionRef.current;
      //     console.log("Current Prediction:", currentPrediction);
      //     ctx.font = "bold 48px Arial";
      //     ctx.fillStyle = "#00FF00";
      //     ctx.textAlign = "center";
      //     ctx.fillText(
      //       `${currentPrediction.predicted_letter} (${(
      //         currentPrediction.confidence * 100
      //       ).toFixed(0)}%)`,
      //       bbox.x + bbox.width / 2,
      //       bbox.y - 20,
      //     );
      //   }

      cropAndQueueImage(bbox);
    }

    ctx.restore();
  };

  return (
    <div className="hands-container">
      <video
        autoPlay
        style={{ display: "none" }}
        ref={(el) => {
          inputVideoRef.current = el;
          setInputVideoReady(!!el);
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // width: 1280,
          // height: 720,
        }}
        width={1920}
        height={1080}
      />
      <canvas ref={cropCanvasRef} style={{ display: "none" }} />
      {/* {error && <div className="error">{error}</div>} */}
      {/* {prediction && (
        <div className="prediction">
          Predicted Letter: {prediction.predicted_letter} (
          {(prediction.confidence * 100).toFixed(2)}%)
        </div>
      )} */}
    </div>
  );
};

export default HandsContainer;
