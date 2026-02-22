import type { FC } from "react";

export const ErrorMessage: FC<ErrorMessageProps> = ({ msg }) => {
  return <div className="error">{msg}</div>;
};

type ErrorMessageProps = {
  msg: string;
};
