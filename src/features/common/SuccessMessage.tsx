import type { FC } from "react";

export const SuccessMessage: FC<SuccessMessageProps> = ({ msg }) => {
  return <div className="success">{msg}</div>;
};

type SuccessMessageProps = {
  msg: string;
};
