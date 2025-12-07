import type { FC } from "react";
import { CardGeneric } from "./CardGeneric.tsx";
import type { CardGenericProps } from "./CardGeneric.tsx";

export const CardWithImage: FC<CardGenericProps & { image: string }> = (
  props
) => {
  const { image, ...genericProps } = props;
  return (
    <>
      <CardGeneric {...genericProps}>
        <img src={image} alt="" style={{ margin: 20 }} />
      </CardGeneric>
    </>
  );
};
