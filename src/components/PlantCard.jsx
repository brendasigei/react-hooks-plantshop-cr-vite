function PlantCard({ plant, onToggleStock }) {
  const inStock = plant.inStock !== false;

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <div className="card-content">
        <h4>{plant.name}</h4>
        <p>Price: {plant.price}</p>
        <button
          className={inStock ? "primary" : ""}
          type="button"
          onClick={() => onToggleStock(plant.id)}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </button>
      </div>
    </li>
  );
}

export default PlantCard;
