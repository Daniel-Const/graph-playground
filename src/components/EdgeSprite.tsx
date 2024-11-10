import { Graphics as IGraphics } from "pixi.js";
import { Graphics } from "@pixi/react";
import { useCallback } from "react";

export const EdgeSprite = ({
  from,
  to,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
}) => {
  const draw = useCallback(
    (g: IGraphics) => {
      g.clear();
      g.moveTo(from.x, from.y);
      g.lineStyle(4, 0x00000, 1);
      g.lineTo(to.x, to.y);
    },
    [from, to]
  );

  return <Graphics draw={draw} anchor={0.5} />;
};
