import type { FC } from "react";

export type NewsHeaderProps = {
  /** Категории новостей */
  categories: string[];
  /** Активная категория новостей */
  activeCategory: string;
};

/** Категории новостей  (СМИ, Германия, Рекомендации), одна из них активная, тут же текущая дата */
export const NewsHeader: FC<NewsHeaderProps> = ({
  categories,
  activeCategory,
}) => {
  const categoriesWithStyle = categories.map((cat) => {
    let style: object;
    if (cat == activeCategory) {
      style = { color: "red" };
    } else {
      style = {};
    }
    return (
      <div key={cat} style={style}>
        {cat}
      </div>
    );
  });
  return <>{categoriesWithStyle}</>;
};
