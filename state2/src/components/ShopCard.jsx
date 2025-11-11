function ShopCard({ card }) {
  return (
    <div className="shop-card">
      <h2>{card.name}</h2>
      <h4>{card.color}</h4>
      <img src={card.img} />
      <footer>
        <nav>${card.price}</nav>
        <p>
          <button>Add to cart</button>
        </p>
      </footer>
    </div>
  );
}

export default ShopCard;
