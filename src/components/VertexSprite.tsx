import { Container, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { Circle } from "./Circle";

const VertexSprite = ({ label, alpha }: { label: string; alpha: number }) => {
  return (
    <>
      <Container alpha={alpha}>
        <Circle r={30} />
        <Text
          text={label}
          anchor={0.5}
          style={
            new TextStyle({
              align: "center",
              fill: "0xffffff",
              fontSize: 15,
              letterSpacing: 1,
            })
          }
        />
      </Container>
    </>
  );
};

export default VertexSprite;
