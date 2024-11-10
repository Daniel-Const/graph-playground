import Tool from "./Tool";
import "./tools.css";

export default function ToolMenu({
  selectNodeTool,
  selectMouseTool,
}: {
  selectNodeTool: () => void;
  selectMouseTool: () => void;
}) {
  return (
    <>
      <div className="tools-container">
        <Tool label="Node" action={selectNodeTool} />
        <Tool label="Mouse" action={selectMouseTool} />
      </div>
    </>
  );
}
