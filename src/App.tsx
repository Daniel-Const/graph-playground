import "@pixi/events";
import { Stage } from "@pixi/react";
import { useLayoutEffect, useState } from "react";
import "./App.css";
import Graph from "./components/Graph.tsx";
import ToolMenu from "./components/tool/ToolMenu.tsx";
import { ToolType } from "./components/tool/ToolType.ts";
import { VertexCursor } from "./components/cursor/VertexCursor.tsx";

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
  // change to 'global' state for verts / edges ?
  const [currentTool, setCurrentTool] = useState<ToolType>(ToolType.Mouse);
  const [vertices, setVertices] = useState<Vertex[]>([
    { x: 300, y: 100, data: "1" },
    { x: 600, y: 100, data: "2" },
  ]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { width, height } = useWindowSize();

  return (
    <>
      <ToolMenu tool={currentTool} selectTool={setCurrentTool} />
      <Stage width={width} height={height} options={{ background: 0x3e444f }}>
        {currentTool == ToolType.Vertex ? <VertexCursor /> : ""}

        <Graph
          vertices={vertices}
          edges={edges}
          tool={currentTool}
          setVertices={setVertices}
          setEdges={setEdges}
        />
      </Stage>
    </>
  );
}

export default App;
