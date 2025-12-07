import type { FC } from "react";

export type CardProps = {
  /** Заголовок блока */
  title: string;
};

/** Блок с произвольным содержимым (погода, телепрограмма и т.д.) */
export const Card: FC<CardProps> = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};
