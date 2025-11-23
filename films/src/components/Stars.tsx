import { type FC } from "react";
import Star from "./Star";

type StarsProps = {
  count?: number;
};

export const Stars: FC<StarsProps> = ({ count }) => {
  const countReal = count ?? 0;
  if (countReal >= 1 && countReal <= 5) {
    const items = [];
    for (let i = 0; i < countReal; i++) {
      items.push(
        <li key={`Star${i}`}>
          <Star />
        </li>
      );
    }
    return <ul className="card-body-stars">{items}</ul>;
  }
};
