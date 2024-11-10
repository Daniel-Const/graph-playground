import "@pixi/events";
import { Container, useApp } from "@pixi/react";
import { DisplayObject, FederatedPointerEvent } from "pixi.js";
import { ReactNode, useRef } from "react";

interface DraggableObject extends DisplayObject {
  alpha: number;
}

export const DraggableContainer = ({
  x,
  y,
  cursor,
  enableDrag,
  children,
  onDragEndCallback,
}: {
  x: number;
  y: number;
  cursor: string;
  enableDrag: boolean;
  children: ReactNode | ReactNode[];
  onDragEndCallback: (x: number, y: number) => void;
}) => {
  const app = useApp();
  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;

  const dragTarget = useRef<DraggableObject | null>(null);

  const onDragStart = (event: FederatedPointerEvent) => {
    const target = event.currentTarget as DraggableObject;
    target.alpha = 0.5;
    dragTarget.current = target;
    app.stage.on("pointermove", onDragMove);
  };

  const onDragEnd = () => {
    if (dragTarget.current) {
      dragTarget.current.alpha = 1;
      app.stage.removeAllListeners("pointermove");
      onDragEndCallback(
        dragTarget.current.position.x,
        dragTarget.current.position.y
      );
      dragTarget.current = null;
    }
  };

  const onDragMove = (event: FederatedPointerEvent) => {
    if (dragTarget.current) {
      dragTarget.current.parent?.toLocal(
        event.global,
        undefined,
        dragTarget.current.position
      );
    }
  };

  return (
    <Container
      x={x}
      y={y}
      eventMode={"static"}
      cursor={cursor}
      pointerdown={enableDrag ? onDragStart : () => {}}
      pointerup={onDragEnd}
    >
      {children}
    </Container>
  );
};
