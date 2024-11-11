import { useApp } from "@pixi/react";
import { DisplayObject, FederatedPointerEvent } from "pixi.js";
import { useRef } from "react";
import { PointerEventBundle } from "../components/VertexContainer";

interface DraggableObject extends DisplayObject {
  alpha: number;
  index: number;
}

export const useDragBundle = (
  dragEndCallback: (x: number, y: number, index: number) => void
): PointerEventBundle => {
  const dragTarget = useRef<DraggableObject | null>(null);
  const app = useApp();
  const dragStart = (event?: FederatedPointerEvent) => {
    const target = event?.currentTarget as DraggableObject;
    target.alpha = 0.5;
    dragTarget.current = target;
    app.stage.on("pointermove", dragMove);
  };

  const dragEnd = () => {
    if (dragTarget.current) {
      dragTarget.current.alpha = 1;
      app.stage.removeAllListeners("pointermove");
      dragTarget.current = null;
    }
  };

  const dragMove = (event?: FederatedPointerEvent) => {
    if (dragTarget.current && event) {
      dragTarget.current.parent?.toLocal(
        event.global,
        undefined,
        dragTarget.current.position
      );
      dragEndCallback(
        dragTarget.current.position.x,
        dragTarget.current.position.y,
        dragTarget.current.index
      );
    }
  };

  return {
    onPointerDown: dragStart,
    onPointerMove: dragMove,
    onPointerUp: dragEnd,
  };
};
