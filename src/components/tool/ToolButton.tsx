export default function ToolButton({
  label,
  action,
  isSelected,
}: {
  label: string;
  action: () => void;
  isSelected: boolean;
}) {
  const background = isSelected ? "grey" : "black";
  return (
    <>
      <button style={{ backgroundColor: background }} onClick={action}>
        {label}
      </button>
    </>
  );
}
