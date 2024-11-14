import { useApp } from "@pixi/react";
import { DisplayObject, FederatedPointerEvent } from "pixi.js";
import { useRef } from "react";
import { MetaData, PointerEventBundle } from "../components/EventContainer";

interface DraggableObject extends DisplayObject {
  alpha: number;
  meta: MetaData;
}

export const useDragBundle = (
  dragEndCallback: (x: number, y: number, id: string) => void
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
        dragTarget.current.meta.id
      );
    }
  };

  return {
    onPointerDown: dragStart,
    onPointerMove: dragMove,
    onPointerUp: dragEnd,
  };
};
