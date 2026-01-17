import { useLocation, useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      key: 1,
      path: "/",
      name: "Главная",
    },
    {
      key: 2,
      path: "/drift",
      name: "Дрифт-такси",
    },
    {
      key: 3,
      path: "/timeattack",
      name: "Time Attack",
    },
    {
      key: 4,
      path: "/forza",
      name: "Forza Karting",
    },
  ];

  return (
    <>
      <nav className="menu">
        {items.map((item) => {
          let cln;
          if (location.pathname === item.path) {
            cln = "menu__item-active";
          } else {
            cln = "menu__item";
          }
          return (
            <a
              className={cln}
              onClick={() => navigate(item.path)}
              key={item.key}
            >
              {item.name}
            </a>
          );
        })}
      </nav>
    </>
  );
}
