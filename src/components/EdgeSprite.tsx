import { Graphics } from "@pixi/react";
import { Graphics as IGraphics } from "pixi.js";
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
      if (!(from.x && to.x && from.y && to.y)) {
        return;
      }

      g.clear();
      // Hit area for selecting edges (4 triangles for good coverage)
      g.beginFill(0x000000, 0.01);
      g.drawPolygon(from.x - 10, from.y, from.x + 10, from.y, to.x, to.y);
      g.drawPolygon(to.x - 10, to.y, to.x + 10, to.y, from.x, from.y);
      g.drawPolygon(from.x, from.y - 10, from.x, from.y + 10, to.x, to.y);
      g.drawPolygon(to.x, to.y - 10, to.x, to.y + 10, from.x, from.y);

      g.moveTo(from.x, from.y);
      g.lineStyle(4, 0x00000, 1);
      g.lineTo(to.x, to.y);
      g.endFill();
    },
    [from, to]
  );

  return <Graphics draw={draw} anchor={0.5} />;
};
