import "@pixi/events";
import { FederatedPointerEvent } from "@pixi/events";
import { Container, useApp } from "@pixi/react";
import { useState } from "react";
import VertexSprite from "./VertexSprite";

export const VertexCursor = () => {
  const app = useApp();
  const startPosition = app.renderer.events.pointer.global;
  const [cursorPos, setCursorPos] = useState({
    x: startPosition.x,
    y: startPosition.y,
  });

  const updateCursorPosition = (event: FederatedPointerEvent) => {
    setCursorPos({ x: event.global.x, y: event.global.y });
  };

  app.stage.on("pointermove", updateCursorPosition);

  return (
    <Container x={cursorPos.x} y={cursorPos.y}>
      <VertexSprite label={"A"} alpha={0.5} />
    </Container>
  );
};
