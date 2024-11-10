import VertexSprite from "./VertexSprite";
import "@pixi/events";
import { useApp } from "@pixi/react";
import { DisplayObject, FederatedPointerEvent } from "pixi.js";
import { useRef } from "react";
import { Vertex } from "../App";

export interface DraggableObject extends DisplayObject {
  index: number;
  alpha: number;
}

export const Graph = ({
  nodes,
  setNodes,
  tool,
}: {
  nodes: Vertex[];
  setNodes: (n: Vertex[]) => void;
  tool: string;
}) => {
  const dragTarget = useRef<DraggableObject | null>(null);
  const app = useApp();

  const onDragStart = ({
    sprite,
    index,
  }: {
    sprite: DraggableObject;
    index: number;
  }) => {
    dragTarget.current = sprite;
    // Set the index into the nodes array
    dragTarget.current.index = index;
    app.stage.on("pointermove", onDragMove);
  };

  const onDragEnd = () => {
    if (dragTarget.current) {
      dragTarget.current.alpha = 1;
      app.stage.removeAllListeners("pointermove");

      // Update node position
      const newNodes = [...nodes];
      const idx = dragTarget.current.index;
      newNodes[idx].x = dragTarget.current.position.x;
      newNodes[idx].y = dragTarget.current.position.y;
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

  const onAddNode = (event: FederatedPointerEvent) => {
    const position = event.global;
    setNodes([...nodes, { x: position.x, y: position.y }]);
  };

  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;

  if (tool == "node") {
    // Node tool selected
    app.stage.on("pointerdown", onAddNode);
  } else if (tool == "mouse") {
    // Mouse tool selected
    app.stage.removeAllListeners("pointerdown");
  }
  // else... app.stage.on("pointerdown", onDeleteNode);

  return (
    <>
      {nodes.map((node: Vertex, i: number) => (
        <VertexSprite
          key={i}
          vertex={node}
          index={i}
          dragStartCallback={onDragStart}
          dragEndCallback={onDragEnd}
          cursor={tool == "mouse" ? "pointer" : "default"}
          enableDrag={tool == "mouse"} // getChildAt??
        />
      ))}
    </>
  );
};

export default Graph;
