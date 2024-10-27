export default {
  async fetch(request) {
    const upgradeHeader = request.headers.get("Upgrade");
    if (!upgradeHeader || upgradeHeader !== "websocket") {
      return new Response("Expected Upgrade: websocket", { status: 426 });
    }

    // Create WebSocket pair
    const webSocketPair = new WebSocketPair();
    const [client, server] = Object.values(webSocketPair);

    // Accept the WebSocket connection
    server.accept();

    // Handle incoming messages (video frames)
    server.addEventListener("message", async (event) => {
      try {
        // Decode the frame from the client (expecting it to be a base64 image)
        const base64ImageData = event.data;

        // Call local Flask server for ASL inference
        const inferenceResult = await runASLInference(base64ImageData);

        // Send back the inference result to the client
        server.send(JSON.stringify(inferenceResult));
      } catch (err) {
        console.error("Error processing message:", err);
        server.send(JSON.stringify({ error: "Failed to process frame" }));
      }
    });

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  },
};

// Function to call the local Flask ASL inference API
async function runASLInference(base64ImageData) {
  // Decode base64 image data to binary
  const bufferData = Buffer.from(base64ImageData, "base64");

  // Send the binary data to the Flask server
  const response = await fetch("http://localhost:8000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
    },
    body: bufferData,
  });

  if (!response.ok) {
    console.error(`Flask server error: ${await response.text()}`);
    throw new Error("Inference API call failed");
  }

  const result = await response.json();
  return result.detections;
}
