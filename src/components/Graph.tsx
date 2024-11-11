import "@pixi/events";
import { useApp } from "@pixi/react";
import { FederatedPointerEvent } from "pixi.js";
import { Edge, Vertex } from "../App";
import VertexSprite from "./VertexSprite";
import { ToolType } from "./tool/ToolType";
import { useState } from "react";
import { EdgeCursor } from "./cursor/EdgeCursor";
import { PointerEventBundle, VertexContainer } from "./VertexContainer";
import { useDragBundle } from "../events/DragEventBundle";
import { useSelectBundle } from "../events/SelectEventBundle";
import { EdgeSprite } from "./EdgeSprite";

interface NewEdge {
  from: number | null;
  to: number | null;
}

export const NewGraph = ({
  vertices,
  edges,
  tool,
  setVertices,
  setEdges,
}: {
  vertices: Vertex[];
  edges: Edge[];
  tool: ToolType;
  setVertices: (vertices: Vertex[]) => void;
  setEdges: (vertices: Edge[]) => void;
}) => {
  const [newEdge, setNewEdge] = useState<NewEdge>({ from: null, to: null });

  const app = useApp();
  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;

  const updateVertexPosition = (x: number, y: number, index: number) => {
    const newvertices = [...vertices];
    newvertices[index].x = x;
    newvertices[index].y = y;
    setVertices(newvertices);
  };

  // Move to pointerEventBundle
  const onAddNode = (event: FederatedPointerEvent) => {
    const position = event.global;
    setVertices([
      ...vertices,
      { x: position.x, y: position.y, data: vertices.length.toString() },
    ]);
  };

  let pointerEventBundles: PointerEventBundle[] = [];
  const dragEventBundle = useDragBundle(updateVertexPosition);
  const selectEventBundle = useSelectBundle((index: number) => {
    console.log("Selected ", index);
  });
  const selectEdgeEventBundle = useSelectBundle((index: number) => {
    if (newEdge.from === null) {
      setNewEdge({ from: index, to: null });
    } else if (newEdge.to === null) {
      setEdges([...edges, { from: newEdge.from, to: index }]);
      setNewEdge({ from: null, to: null });
    }
  });

  switch (tool) {
    case ToolType.Vertex:
      app.stage.on("pointerdown", onAddNode);
      break;
    case ToolType.Mouse:
      pointerEventBundles = [dragEventBundle, selectEventBundle];
      app.stage.removeAllListeners("pointerdown");
      break;
    case ToolType.Edge:
      pointerEventBundles = [selectEventBundle, selectEdgeEventBundle];
      app.stage.removeAllListeners("pointerdown");
  }

  const getEdgeKey = (v1: Vertex, v2: Vertex) => {
    return `${v1.x}${v1.y}${v2.x}${v2.y}`;
  };

  return (
    <>
      {tool == ToolType.Edge && newEdge.from !== null ? (
        <EdgeCursor
          key={newEdge.from}
          anchorPosition={
            newEdge.from !== null
              ? {
                  x: vertices[newEdge.from].x,
                  y: vertices[newEdge.from].y,
                }
              : null
          }
        />
      ) : (
        ""
      )}
      {edges.map((edge: Edge) => (
        <EdgeSprite
          from={vertices[edge.from]}
          to={vertices[edge.to]}
          key={getEdgeKey(vertices[edge.from], vertices[edge.to])}
        />
      ))}
      {vertices.map((vertex: Vertex, index: number) => {
        return (
          <VertexContainer
            x={vertex.x}
            y={vertex.y}
            key={index}
            index={index}
            pointerEventBundles={pointerEventBundles}
          >
            <VertexSprite label={vertex.data} alpha={1} />
          </VertexContainer>
        );
      })}
    </>
  );
};

export default NewGraph;
