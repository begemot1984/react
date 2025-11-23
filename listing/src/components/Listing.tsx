import { type FC } from "react";

type ImegaItem = {
  url_570xN: string;
};

export type ListingItem = {
  listing_id: number;
  url?: string;
  MainImage?: ImegaItem;
  title?: string;
  currency_code?: string;
  price?: string;
  quantity?: number;
};

type ListingProps = {
  items?: ListingItem[];
};

export const Listing: FC<ListingProps> = ({ items }) => {
  const divs = [];
  for (const item of items ?? []) {
    // не выводим, если нет всех нужных данных по предложению
    if (
      item.url &&
      item.MainImage &&
      item.title &&
      item.currency_code &&
      item.price &&
      item.quantity
    ) {
      const price =
        item.currency_code == "USD"
          ? `\u0024${item.price}`
          : item.currency_code == "EUR"
          ? `\u20AC${item.price}`
          : `${item.price} ${item.currency_code}`;
      const title =
        item.title.length <= 50
          ? item.title
          : `${item.title.substring(0, 49)}...`;
      let quantityCategory;
      if (item.quantity <= 10) {
        quantityCategory = "low";
      } else if (item.quantity <= 20) {
        quantityCategory = "medium";
      } else {
        quantityCategory = "high";
      }
      const quantityClassName = `item-quantity level-${quantityCategory}`;
      divs.push(
        <div className="item" key={item.listing_id}>
          <div className="item-image">
            <a href={item.url}>
              <img src={item.MainImage?.url_570xN} />
            </a>
          </div>
          <div className="item-details">
            <p className="item-title">{title}</p>
            <p className="item-price">{price}</p>
            <p className={quantityClassName}>{item.quantity} left</p>
          </div>
        </div>
      );
    }
  }
  return <div className="item-list">{divs}</div>;
};
