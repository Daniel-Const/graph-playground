import "@pixi/events";
import { useApp } from "@pixi/react";
import { FederatedPointerEvent } from "pixi.js";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Edges, Vertex } from "../App";
import { useDragBundle } from "../events/DragEventBundle";
import { useSelectBundle } from "../events/SelectEventBundle";
import { EdgeCursor } from "./cursor/EdgeCursor";
import { EdgeSprite } from "./EdgeSprite";
import { EventContainer, MetaData, PointerEventBundle } from "./EventContainer";
import { ToolType } from "./tool/ToolType";
import VertexSprite from "./VertexSprite";

interface NewEdge {
  from: string | null;
  to: string | null;
}

export const NewGraph = ({
  vertices,
  edges,
  tool,
  setVertices,
  setEdges,
}: {
  vertices: Vertex[];
  edges: Edges;
  tool: ToolType;
  setVertices: (vertices: Vertex[]) => void;
  setEdges: (vertices: Edges) => void;
}) => {
  const [newEdge, setNewEdge] = useState<NewEdge>({ from: null, to: null });

  const app = useApp();
  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;

  const updateVertexPosition = (x: number, y: number, id: string) => {
    vertices.forEach((v, i) => {
      if (v.id === id) {
        const newvertices = [...vertices];
        newvertices[i].x = x;
        newvertices[i].y = y;
        setVertices(newvertices);
        return;
      }
    });
  };

  // Move to pointerEventBundle
  const onAddNode = (event: FederatedPointerEvent) => {
    const position = event.global;
    setVertices([
      ...vertices,
      {
        x: position.x,
        y: position.y,
        data: (vertices.length + 1).toString(),
        id: uuidv4(),
      },
    ]);
  };

  let vertexEventBundles: PointerEventBundle[] = [];
  let edgeEventBundles: PointerEventBundle[] = [];

  const dragEventBundle = useDragBundle(updateVertexPosition);
  const selectEventBundle = useSelectBundle((meta: MetaData) => {
    console.log("Selected ", meta.id);
  });
  const selectEdgeEventBundle = useSelectBundle((meta: MetaData) => {
    if (newEdge.from === null) {
      setNewEdge({ from: meta.id, to: null });
    } else if (newEdge.to === null) {
      if (
        edges[newEdge.from] !== undefined &&
        edges[newEdge.from].includes(meta.id)
      ) {
        return;
      }
      const newEdges = Object.assign({}, edges);
      if (newEdges[newEdge.from] === undefined) {
        newEdges[newEdge.from] = [];
      }
      newEdges[newEdge.from].push(meta.id);
      setEdges(newEdges);
      setNewEdge({ from: null, to: null });
    }
  });

  const deleteEdgeEventBundle = useSelectBundle((meta) => {
    if (meta.id) deleteEdge(meta.id);
  });
  const deleteVertexEventBundle = useSelectBundle((meta) => {
    if (meta.id) deleteVertex(meta.id);
  });

  const deleteEdge = (identifier: string) => {
    // Delete {start_id -> end_id} edge from identifier
    const [start, end] = identifier.split("_");
    if (edges[start] === undefined) {
      return;
    }
    const newEdges = Object.assign({}, edges);
    newEdges[start] = newEdges[start].filter((i: string) => i !== end);
    if (newEdges[start].length === 0) {
      delete newEdges[start];
    }
    setEdges(newEdges);
  };

  const deleteVertex = (index: string) => {
    // Delete connected edges
    vertices.forEach((v) => {
      deleteEdge(getEdgeIdentifier(v.id, index));
      deleteEdge(getEdgeIdentifier(index, v.id));
    });

    const newEdges = Object.assign({}, edges);
    delete newEdges[index];
    setEdges(newEdges);

    // Delete vertex
    const newVertices = vertices.filter((v) => v.id !== index);
    setVertices(newVertices);
  };

  // Handle event bundles for the given tool
  app.stage.removeAllListeners("pointerdown");
  switch (tool) {
    case ToolType.Vertex:
      app.stage.on("pointerdown", onAddNode);
      break;
    case ToolType.Mouse:
      vertexEventBundles = [dragEventBundle, selectEventBundle];
      edgeEventBundles = [selectEventBundle];
      break;
    case ToolType.Edge:
      vertexEventBundles = [selectEventBundle, selectEdgeEventBundle];
      break;
    case ToolType.Delete:
      edgeEventBundles = [deleteEdgeEventBundle];
      vertexEventBundles = [deleteVertexEventBundle];
  }

  // Edge identifier: {start-id}_{end-id}
  const getEdgeIdentifier = (id1: string, id2: string) => {
    return `${id1}_${id2}`;
  };

  const getVertexFromId = (id: string) => {
    return vertices.find((v) => v.id === id);
  };

  return (
    <>
      {tool == ToolType.Edge && newEdge.from !== null ? (
        <EdgeCursor
          key={newEdge.from}
          anchorPosition={
            newEdge.from !== null
              ? {
                  x: getVertexFromId(newEdge.from)?.x,
                  y: getVertexFromId(newEdge.from)?.y,
                }
              : null
          }
        />
      ) : (
        ""
      )}
      {Object.keys(edges).map((start: string) => {
        const startVertex = getVertexFromId(start);
        return (
          startVertex &&
          edges[start].map((end) => {
            const endVertex = getVertexFromId(end);
            const edgeIdentifier = getEdgeIdentifier(start, end);

            return (
              endVertex && (
                <EventContainer
                  meta={{
                    id: edgeIdentifier,
                  }}
                  pointerEventBundles={edgeEventBundles}
                  key={edgeIdentifier}
                >
                  <EdgeSprite
                    from={{
                      x: startVertex.x,
                      y: startVertex.y,
                    }}
                    to={{
                      x: endVertex.x,
                      y: endVertex.y,
                    }}
                  />
                </EventContainer>
              )
            );
          })
        );
      })}
      {vertices.map((vertex: Vertex) => {
        return (
          <EventContainer
            x={vertex.x}
            y={vertex.y}
            key={vertex.id}
            meta={{ id: vertex.id }}
            pointerEventBundles={vertexEventBundles}
          >
            <VertexSprite label={vertex.data} alpha={1} />
          </EventContainer>
        );
      })}
    </>
  );
};

export default NewGraph;
