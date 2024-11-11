import ToolButton from "./ToolButton";
import "./tools.css";
import { ToolType } from "./ToolType";

export default function ToolMenu({
  tool,
  selectTool,
}: {
  tool: ToolType;
  selectTool: (tool: ToolType) => void;
}) {
  return (
    <>
      <div className="tools-container">
        <ToolButton
          label="Mouse"
          action={() => selectTool(ToolType.Mouse)}
          isSelected={tool == ToolType.Mouse}
        />
        <ToolButton
          label="Node"
          action={() => selectTool(ToolType.Vertex)}
          isSelected={tool == ToolType.Vertex}
        />
        <ToolButton
          label="Edge"
          action={() => selectTool(ToolType.Edge)}
          isSelected={tool == ToolType.Edge}
        />
      </div>
    </>
  );
}
