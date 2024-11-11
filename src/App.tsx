import "@pixi/events";
import { Stage } from "@pixi/react";
import { useLayoutEffect, useState } from "react";
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

const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

function App() {
  const [currentTool, setCurrentTool] = useState<ToolType>(ToolType.Mouse);
  const [vertices, setVertices] = useState<Vertex[]>([
    { x: 300, y: 100, data: "A" },
    { x: 600, y: 100, data: "B" },
  ]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { width, height } = useWindowSize();

  return (
    <>
      <ToolMenu tool={currentTool} selectTool={setCurrentTool} />
      <Stage width={width} height={height} options={{ background: 0x47453f }}>
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
