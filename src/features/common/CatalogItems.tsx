import type { FC } from "react";
import type { CatalogItem } from "./types";
import { Link } from "react-router-dom";
import { PAGE_ITEM } from "./constants";

export const CatalogItems: FC<CatalogItemsProps> = ({ items }) => {
  return (
    <div className="row">
      {items.map((i) => {
        return (
          <div className="col-4" key={i.id}>
            <div className="card catalog-item-card">
              <img
                src={i.images[0]}
                className="card-img-top img-fluid"
                alt={i.title}
              />
              <div className="card-body">
                <p className="card-text">{i.title}</p>
                <p className="card-text">{i.price}</p>
                <Link to={PAGE_ITEM(i.id)} className="btn btn-outline-primary">
                  Заказать
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

type CatalogItemsProps = {
  items: CatalogItem[];
};
