interface Node {
  x: number;
  y: number;
  size: number;
}

export const renderNodes = (nodes: Node[], ctx: CanvasRenderingContext2D) => {
  nodes.forEach((node: { x: number; y: number; size: number }) => {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size, 0, 2 * Math.PI);
    ctx.fill();
  });
  console.log("Drawing!");
};

export const render = (nodes: Node[], ctx: CanvasRenderingContext2D) => {
  // Clear Canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Render nodes
  renderNodes(nodes, ctx);
};
