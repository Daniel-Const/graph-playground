import "@pixi/events";
import { Container, useApp } from "@pixi/react";
import { FederatedPointerEvent } from "pixi.js";
import { Edge, Vertex } from "../App";
import { DraggableContainer } from "./DraggableContainer";
import { EdgeSprite } from "./EdgeSprite";
import VertexSprite from "./VertexSprite";
import { ToolType } from "./Tool/ToolType";
import { useState } from "react";
import { SelectableContainer } from "./SelectableContainer";
import { EdgeCursor } from "./EdgeCursor";

interface NewEdge {
  from: number | null;
  to: number | null;
}

export const Graph = ({
  vertices,
  edges,
  tool,
  setVertices,
  setEdges,
}: {
  vertices: Vertex[];
  edges: Edge[];
  tool: ToolType;
  setVertices: (v: Vertex[]) => void;
  setEdges: (e: Edge[]) => void;
}) => {
  const app = useApp();
  const [newEdge, setNewEdge] = useState<NewEdge>({ from: null, to: null });

  const onAddNode = (event: FederatedPointerEvent) => {
    const position = event.global;
    setVertices([...vertices, { x: position.x, y: position.y, data: "A" }]);
  };

  switch (tool) {
    case ToolType.Vertex:
      app.stage.on("pointerdown", onAddNode);
      break;
    case ToolType.Mouse:
      app.stage.removeAllListeners("pointerdown");
      break;
    case ToolType.Edge:
      app.stage.removeAllListeners("pointerdown");
  }

  // else... app.stage.on("pointerdown", onDeleteNode);

  const updateVertexPosition = (x: number, y: number, index: number) => {
    const newvertices = [...vertices];
    newvertices[index].x = x;
    newvertices[index].y = y;
    setVertices(newvertices);
  };

  const selectVertexForNewEdge = (i: number) => {
    console.log("SElect vertex for new edge");
    if (newEdge.from === null) {
      setNewEdge({ from: i, to: null });
    } else if (newEdge.to === null) {
      setEdges([...edges, { from: newEdge.from, to: i }]);
      setNewEdge({ from: null, to: null });
    }
  };

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
              ? { x: vertices[newEdge.from].x, y: vertices[newEdge.from].y }
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
        if (tool === ToolType.Mouse) {
          return (
            <DraggableContainer
              x={vertex.x}
              y={vertex.y}
              cursor={tool == ToolType.Mouse ? "pointer" : "default"}
              enableDrag={tool == ToolType.Mouse}
              onDragEndCallback={(x: number, y: number) =>
                updateVertexPosition(x, y, index)
              }
              key={index}
            >
              <VertexSprite label={vertex.data} alpha={1} />
            </DraggableContainer>
          );
        } else if (tool === ToolType.Edge) {
          return (
            <SelectableContainer
              x={vertex.x}
              y={vertex.y}
              cursor={"default"}
              key={`select-container${index}`}
              onSelectCallback={() => selectVertexForNewEdge(index)}
            >
              <VertexSprite
                label={vertex.data}
                alpha={newEdge.from === index ? 0.5 : 1}
              />
            </SelectableContainer>
          );
        } else {
          return (
            <Container x={vertex.x} y={vertex.y} key={index}>
              <VertexSprite label={vertex.data} alpha={1} />
            </Container>
          );
        }
      })}
    </>
  );
};

export default Graph;
