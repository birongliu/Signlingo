"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const WebSocketClient = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleConnect = () => {
    const ws = new WebSocket("ws://localhost:8787");
    setSocket(ws);

    ws.addEventListener("open", () => {
      console.log("WebSocket connection opened.");
      setIsConnected(true);
    });

    ws.addEventListener("message", (event) => {
      setResult(event.data);
    });

    ws.addEventListener("close", () => {
      setIsConnected(false);
    });
  };

  const sendImage = (file: File) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        const base64Data = reader.result?.toString().split(",")[1];
        socket.send(base64Data || "");
      }
    };

    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFileName(file.name);
      sendImage(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">ASL WebSocket Client</h1>
      <button
        onClick={handleConnect}
        className="mb-4 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
      >
        Connect
      </button>
      <div
        {...getRootProps()}
        className={`mt-4 rounded-lg border-2 border-dashed p-6 ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {fileName ? (
          <p>File selected: {fileName}</p>
        ) : isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Upload an image</p>
        )}
      </div>
      {result && <pre className="mt-4">{result}</pre>}
      {isConnected && <p className="mt-2">Connected to WebSocket.</p>}
    </div>
  );
};

export default WebSocketClient;
