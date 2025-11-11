import ShopItem from "./ShopItem.jsx";

function ListView({ items }) {
  return (
    <>
      <nav>
        <div id="menuBar">
          {items.map((item) => (
            <tr>
              <ShopItem item={item} />
            </tr>
          ))}
        </div>
      </nav>
    </>
  );
}

export default ListView;
