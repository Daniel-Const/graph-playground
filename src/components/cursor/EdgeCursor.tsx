import { useApp } from "@pixi/react";
import { FederatedPointerEvent } from "pixi.js";
import { useState } from "react";
import { EdgeSprite } from "../EdgeSprite";

export const EdgeCursor = ({
  anchorPosition,
}: {
  anchorPosition: { x: number; y: number } | null;
}) => {
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
    <>
      {anchorPosition !== null ? (
        <EdgeSprite
          from={{ x: anchorPosition.x, y: anchorPosition.y }}
          to={{ x: cursorPos.x, y: cursorPos.y }}
        />
      ) : (
        ""
      )}
    </>
  );
};
