import WebSocketClient from "./WebSocketClient";

export default function HomePage() {
  return (
    <div>
      <h1>ASL Inference via WebSocket</h1>
      <WebSocketClient />
    </div>
  );
}
