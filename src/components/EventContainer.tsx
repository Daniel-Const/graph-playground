/**
 * Event Container
 *
 * Custom Pixi Container: extends containers to keep track of extra data and for
 * handling pointer events in a more generic way
 */

import "@pixi/events";
import { Container } from "@pixi/react";
import { FederatedPointerEvent } from "pixi.js";
import { ReactNode } from "react";

type PointerEvent = (event?: FederatedPointerEvent) => void;

export interface PointerEventBundle {
  onPointerDown?: PointerEvent;
  onPointerUp?: PointerEvent;
  onPointerMove?: PointerEvent;
  onPointerOver?: PointerEvent;
  onPointerOut?: PointerEvent;
}

export interface MetaData {
  id: string;
}

export interface VertexContainerProps {
  x?: number;
  y?: number;
  meta?: MetaData;
  children: ReactNode | ReactNode[];
  pointerEventBundles: PointerEventBundle[];
}

export const EventContainer = ({
  pointerEventBundles,
  ...props
}: VertexContainerProps) => {
  // TODO: Fix types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const events: any = {
    onPointerDown: [],
    onPointerUp: [],
    onPointerMove: [],
    onPointerOver: [],
    onPointerOut: [],
  };

  pointerEventBundles.forEach((bundle) => {
    let key: keyof PointerEventBundle;
    for (key in bundle) {
      if (bundle[key] !== undefined) {
        events[key].push(bundle[key]);
      }
    }
  });

  return (
    <Container
      eventMode={"static"}
      {...props}
      pointerdown={(event?: FederatedPointerEvent) => {
        events.onPointerDown.forEach(
          (eventFn: (e?: FederatedPointerEvent) => void) => eventFn(event)
        );
      }}
      pointerup={(event?: FederatedPointerEvent) => {
        events.onPointerUp.forEach(
          (eventFn: (e?: FederatedPointerEvent) => void) => eventFn(event)
        );
      }}
      pointermove={(event?: FederatedPointerEvent) => {
        events.onPointerMove.forEach(
          (eventFn: (e?: FederatedPointerEvent) => void) => eventFn(event)
        );
      }}
      pointerover={(event?: FederatedPointerEvent) => {
        events.onPointerOver.forEach(
          (eventFn: (e?: FederatedPointerEvent) => void) => eventFn(event)
        );
      }}
      pointerout={(event?: FederatedPointerEvent) => {
        events.onPointerOut.forEach(
          (eventFn: (e?: FederatedPointerEvent) => void) => eventFn(event)
        );
      }}
    />
  );
};
