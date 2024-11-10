import "@pixi/events";
import { Stage } from "@pixi/react";
import { useState } from "react";
import "./App.css";
import Graph from "./components/Graph.tsx";
import ToolMenu from "./components/Tool/ToolMenu.tsx";
import { ToolType } from "./components/Tool/ToolType.ts";
import { VertexCursor } from "./components/VertexCursor.tsx";

export interface Vertex {
  x: number;
  y: number;
  data: string;
}

export interface Edge {
  from: number;
  to: number;
}

function App() {
  const [currentTool, setCurrentTool] = useState<ToolType>(ToolType.Mouse);
  const [vertices, setVertices] = useState<Vertex[]>([
    { x: 300, y: 100, data: "A" },
    { x: 600, y: 100, data: "B" },
  ]);
  const [edges, setEdges] = useState<Edge[]>([]);

  return (
    <>
      <ToolMenu tool={currentTool} selectTool={setCurrentTool} />
      <Stage
        width={window.innerWidth}
        height={window.innerWidth}
        options={{ background: 0x1099bb }}
      >
        {currentTool == ToolType.Vertex ? <VertexCursor /> : ""}

        <Graph
          vertices={vertices}
          edges={edges}
          setVertices={(v: Vertex[]) => setVertices(v)}
          setEdges={(e: Edge[]) => setEdges(e)}
          tool={currentTool}
          key={currentTool}
        />
      </Stage>
    </>
  );
}

export default App;
