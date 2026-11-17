import { useState } from "react";

function PlantCard({ plant }) {
  // Local, non-persisting stock status (resets on refresh)
  const [inStock, setInStock] = useState(true);

  return (
    <li className="rounded-lg border p-4 text-center shadow-sm">
      <img className="mx-auto h-40 w-full rounded object-cover" src={plant.image} alt={plant.name} />
      <h4 className="mt-2 font-semibold">{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <button
        onClick={() => setInStock(!inStock)}
        className={`mt-2 rounded px-3 py-1 text-white ${inStock ? "bg-green-600" : "bg-red-600"}`}
      >
        {inStock ? "In Stock" : "Out of Stock"}
      </button>
    </li>
  );
}

export default PlantCard;