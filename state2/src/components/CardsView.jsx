import ShopCard from "./ShopCard.jsx";

function CardsView({ cards }) {
  return (
    <div className="flex-container">
      {cards.map((card) => (
        <div className="flex-item">
          <ShopCard card={card} />
        </div>
      ))}
    </div>
  );
}

export default CardsView;
