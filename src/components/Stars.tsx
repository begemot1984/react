import { type FC } from "react";
import Star from "./Star";

type StarsProps = {
  count: number;
};

export const Stars: FC<StarsProps> = ({ count }) => {
  if (count >= 1 && count <= 5) {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(
        <li>
          <Star />
        </li>
      );
    }
    return <ul className="card-body-stars">{items}</ul>;
  }
};
