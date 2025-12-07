import type { FC, PropsWithChildren } from "react";

export type CardGenericProps = {
  title: string;
  text: string;
  link: string;
};

// в children будет image или ничего
export type CardGenericPropsWithChildren = PropsWithChildren<CardGenericProps>;

export const CardGeneric: FC<CardGenericPropsWithChildren> = (props) => {
  return (
    <>
      <div className="card" style={{ width: 300 }}>
        <div className="card-body">
          {props.children}
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.text}</p>
          <a href="#" className="btn btn-primary">
            {props.link}
          </a>
        </div>
      </div>
    </>
  );
};
