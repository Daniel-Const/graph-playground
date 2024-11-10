import { Container, useApp } from "@pixi/react";
import { DisplayObject, FederatedPointerEvent } from "pixi.js";
import { ReactNode } from "react";

interface SelectableObject extends DisplayObject {
  alpha: number;
}

export const SelectableContainer = ({
  x,
  y,
  cursor,
  children,
  onSelectCallback,
}: {
  x: number;
  y: number;
  cursor: string;
  children: ReactNode | ReactNode[];
  onSelectCallback: () => void;
}) => {
  const app = useApp();
  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;

  const onSelect = () => {
    onSelectCallback();
  };

  const onHover = (event: FederatedPointerEvent) => {
    const target = event.currentTarget as SelectableObject;
    target.alpha = 0.5;
  };

  const onExit = (event: FederatedPointerEvent) => {
    const target = event.currentTarget as SelectableObject;
    target.alpha = 1;
  };

  return (
    <Container
      x={x}
      y={y}
      eventMode={"static"}
      cursor={cursor}
      pointerdown={onSelect}
      pointerover={onHover}
      pointerout={onExit}
    >
      {children}
    </Container>
  );
};
