function ShopItem({ item }) {
  return (
    <>
      <div>
        <img src={item.img} />
      </div>
      <div>
        <h2>{item.name}</h2>
      </div>
      <div>
        <h4>{item.color}</h4>
      </div>
      <div>
        <span className="price">${item.price}</span>
      </div>
      <div>
        <button>Add to cart</button>
      </div>
    </>
  );
}

export default ShopItem;
