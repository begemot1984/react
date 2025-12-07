import type { FC } from "react";

export type NewsItemProps = {
  /** Иконка новости */
  icon?: string;
  /** Заголовок новости */
  title: string;
  /** Ссылка на новость */
  link: string;
};

/** Новость */
export const NewsItem: FC<NewsItemProps> = ({ icon, title, link }) => {
  return (
    <div>
      <img src={icon} />
      <a href={link}>{title}</a>
    </div>
  );
};
