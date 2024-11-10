import { Graphics as IGraphics } from "pixi.js";
import { Graphics } from "@pixi/react";
import { useCallback } from "react";

export const Circle = ({
  x = -1,
  y = -1,
  r,
}: {
  x?: number;
  y?: number;
  r: number;
}) => {
  const draw = useCallback(
    (g: IGraphics) => {
      g.clear();
      g.beginFill();
      g.drawCircle(x, y, r);
      g.endFill();
    },
    [x, y, r]
  );

  return <Graphics draw={draw} anchor={0.5} />;
};
