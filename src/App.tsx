import "@pixi/events";
import { Stage } from "@pixi/react";
import { useState } from "react";
import "./App.css";
import Graph from "./components/Graph.tsx";
import ToolMenu from "./components/ToolMenu";

export interface Vertex {
  x: number;
  y: number;
}

function App() {
  const [currentTool, setCurrentTool] = useState("mouse");
  // TODO: Rename nodes to vertices
  const [nodes, setNodes] = useState<Vertex[]>([{ x: 300, y: 100 }]);

  const selectNodeTool = () => {
    console.log("selected node tool");
    setCurrentTool("node");
  };

  const selectMouseTool = () => {
    console.log("selected mouse tool");
    setCurrentTool("mouse");
  };

  return (
    <>
      <ToolMenu
        selectNodeTool={selectNodeTool}
        selectMouseTool={selectMouseTool}
      />
      <Stage
        width={window.innerWidth}
        height={window.innerWidth}
        options={{ background: 0x1099bb }}
      >
        <Graph
          nodes={nodes}
          setNodes={(n: Vertex[]) => setNodes(n)}
          tool={currentTool}
          key={currentTool}
        />
      </Stage>
    </>
  );
}

export default App;
