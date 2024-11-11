import { DisplayObject, FederatedPointerEvent } from "pixi.js";
import { PointerEventBundle } from "../components/VertexContainer";

interface SelectableObject extends DisplayObject {
  alpha: number;
  index: number;
}

export const useSelectBundle = (
  selectCallback: (index: number) => void
): PointerEventBundle => {
  const onSelect = (event?: FederatedPointerEvent) => {
    const target = event?.currentTarget as SelectableObject;
    if (target) {
      selectCallback(target.index);
    }
  };

  const onHover = (event?: FederatedPointerEvent) => {
    const target = event?.currentTarget as SelectableObject;
    target.alpha = 0.5;
  };

  const onExit = (event?: FederatedPointerEvent) => {
    const target = event?.currentTarget as SelectableObject;
    target.alpha = 1;
  };

  return {
    onPointerDown: onSelect,
    onPointerOver: onHover,
    onPointerOut: onExit,
  };
};
