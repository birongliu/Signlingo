/* eslint-disable import/no-anonymous-default-export */
export default {
  async fetch(request) {
    const upgradeHeader = request.headers.get("Upgrade");
    if (!upgradeHeader || upgradeHeader !== "websocket") {
      return new Response("Expected Upgrade: websocket", { status: 426 });
    }

    const webSocketPair = new WebSocketPair();
    const [client, server] = Object.values(webSocketPair);

    server.accept();

    server.addEventListener("message", async (event) => {
      try {
        const base64ImageData = event.data;

        const inferenceResult = await runASLInference(base64ImageData);

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

async function runASLInference(base64ImageData) {
  const bufferData = Buffer.from(base64ImageData, "base64");

  const response = await fetch("https://myflaskapp.example.com/predict", {
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
