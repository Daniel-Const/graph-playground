import VertexSprite from "./VertexSprite";
import "@pixi/events";
import { useApp } from "@pixi/react";
import { FederatedPointerEvent } from "pixi.js";
import { Vertex } from "../App";

export const Graph = ({
  nodes,
  setNodes,
  tool,
}: {
  nodes: Vertex[];
  setNodes: (n: Vertex[]) => void;
  tool: string;
}) => {
  const app = useApp();

  // TODO Move to Tools Provider
  const onAddNode = (event: FederatedPointerEvent) => {
    const position = event.global;
    setNodes([...nodes, { x: position.x, y: position.y }]);
  };

  if (tool == "node") {
    // Node tool selected
    app.stage.on("pointerdown", onAddNode);
  } else if (tool == "mouse") {
    // Mouse tool selected
    app.stage.removeAllListeners("pointerdown");
  }
  // else... app.stage.on("pointerdown", onDeleteNode);

  const updateVertexPosition = (x: number, y: number, index: number) => {
    const newNodes = [...nodes];
    newNodes[index].x = x;
    newNodes[index].y = y;
  };

  return (
    <>
      {nodes.map((node: Vertex, i: number) => (
        <VertexSprite
          key={i}
          vertex={node}
          index={i}
          cursor={tool == "mouse" ? "pointer" : "default"}
          enableDrag={tool == "mouse"} // getChildAt??
          updateVertexPositionCallback={updateVertexPosition}
        />
      ))}
    </>
  );
};

export default Graph;
