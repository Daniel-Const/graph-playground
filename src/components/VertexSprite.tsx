import { Container, Text } from "@pixi/react";
import "@pixi/events";
import { FederatedPointerEvent } from "@pixi/events";
import { DraggableObject } from "./Graph";
import { Circle } from "./Circle";
import { TextStyle } from "pixi.js";
import { Vertex } from "../App";

const GraphNodeSprite = ({
  vertex,
  cursor,
  index,
  enableDrag,
  dragStartCallback,
  dragEndCallback,
}: {
  vertex: Vertex;
  cursor: string;
  index: number;
  enableDrag: boolean;
  dragStartCallback: ({
    sprite,
    index,
  }: {
    sprite: DraggableObject;
    index: number;
  }) => void;
  dragEndCallback: () => void;
}) => {
  const onDragEnd = () => {
    dragEndCallback();
  };

  const onDragStart = (event: FederatedPointerEvent) => {
    const sprite = event.currentTarget as DraggableObject;
    sprite.alpha = 0.5;
    dragStartCallback({ sprite, index });
  };

  return (
    <Container
      x={vertex.x}
      y={vertex.y}
      eventMode={"static"}
      cursor={cursor}
      pointerdown={enableDrag ? onDragStart : () => {}}
      pointerup={onDragEnd}
    >
      <Circle r={30} />
      <Text
        text="A"
        anchor={0.5}
        style={
          new TextStyle({
            align: "center",
            fill: "0xffffff",
            fontSize: 15,
            letterSpacing: 1,
          })
        }
      />
    </Container>
  );
};

export default GraphNodeSprite;
