import type { FC, PropsWithChildren } from "react";

/** Блоки с произвольным содержимым (погода, телепрограмма и т.д.) */
export const CardList: FC<PropsWithChildren<object>> = ({ children }) => {
  return <>{children}</>;
};
