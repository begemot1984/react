import type { FC } from "react";

export type CurrencyItemProps = {
  /** Валюта */
  currency: string;
  /** Биржа */
  market: string;
  /** Курс */
  rate: number;
  /** Изменение курса относительно вчера */
  change: string;
};

/** Курс валюты */
export const CurrencyItem: FC<CurrencyItemProps> = ({
  currency,
  market,
  rate,
  change,
}) => {
  return (
    <div>
      {currency}&nbsp;
      {market}&nbsp;
      {rate}&nbsp;
      {change}%
    </div>
  );
};
