import "@pixi/events";
import { Stage } from "@pixi/react";
import { useLayoutEffect, useState } from "react";
import "./App.css";
import { VertexCursor } from "./components/cursor/VertexCursor.tsx";
import Graph from "./components/Graph.tsx";
import ToolMenu from "./components/tool/ToolMenu.tsx";
import { ToolType } from "./components/tool/ToolType.ts";

export interface Vertex {
  x: number;
  y: number;
  data: string;
  id: string;
}

export interface Edge {
  from: string;
  to: string;
}

export type Edges = { [key: string]: string[] };

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
    { x: 300, y: 100, data: "1", id: "abcd" },
    { x: 600, y: 100, data: "2", id: "defgh" },
  ]);
  const [edges, setEdges] = useState<{ [key: string]: string[] }>({
    abcd: ["defgh"],
  });
  const { width, height } = useWindowSize();

  return (
    <>
      <ToolMenu tool={currentTool} selectTool={setCurrentTool} />
      <Stage width={width} height={height} options={{ background: 0x3e444f }}>
        {currentTool == ToolType.Vertex ? (
          <VertexCursor label={(vertices.length + 1).toString()} />
        ) : (
          ""
        )}

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
