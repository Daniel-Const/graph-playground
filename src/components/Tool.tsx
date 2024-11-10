export default function Tool({label, action}: {label: string, action: () => void}) {
  return (
    <>
      <button onClick={action}>{label}</button>
    </>
  );
}
