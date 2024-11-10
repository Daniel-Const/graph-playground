import "@pixi/events";
import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { Vertex } from "../App";
import { Circle } from "./Circle";
import { DraggableContainer } from "./DraggableContainer";

const GraphNodeSprite = ({
  vertex,
  cursor,
  index,
  enableDrag,
  updateVertexPositionCallback,
}: {
  vertex: Vertex;
  cursor: string;
  index: number;
  enableDrag: boolean;
  updateVertexPositionCallback: (x: number, y: number, index: number) => void;
}) => {
  const updateVertexPosition = (x: number, y: number) => {
    updateVertexPositionCallback(x, y, index);
  };

  return (
    <DraggableContainer
      x={vertex.x}
      y={vertex.y}
      cursor={cursor}
      enableDrag={enableDrag}
      onDragEndCallback={updateVertexPosition}
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
    </DraggableContainer>
  );
};

export default GraphNodeSprite;
