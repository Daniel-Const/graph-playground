import { DisplayObject, FederatedPointerEvent } from "pixi.js";
import { MetaData, PointerEventBundle } from "../components/EventContainer";

interface SelectableObject extends DisplayObject {
  alpha: number;
  meta: MetaData;
}

export const useSelectBundle = (
  selectCallback: (meta: MetaData) => void
): PointerEventBundle => {
  const onSelect = (event?: FederatedPointerEvent) => {
    const target = event?.currentTarget as SelectableObject;
    if (target) {
      selectCallback(target.meta);
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
