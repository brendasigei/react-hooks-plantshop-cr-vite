import { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({ name: "", image: "", price: "" });

  // Keep each input in sync with state, keyed by the input's name
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // POST the new plant to the backend, then pass the saved plant up to the parent
  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, price: parseFloat(formData.price) }),
    })
      .then((res) => res.json())
      .then((newPlant) => {
        onAddPlant(newPlant);
        setFormData({ name: "", image: "", price: "" });
      });
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 grid gap-3 rounded-lg border p-4 sm:grid-cols-4">
      <input className="rounded border p-2" type="text" name="name" placeholder="Plant name" value={formData.name} onChange={handleChange} />
      <input className="rounded border p-2" type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
      <input className="rounded border p-2" type="number" name="price" step="0.01" placeholder="Price" value={formData.price} onChange={handleChange} />
      <button type="submit" className="rounded bg-green-600 p-2 text-white hover:bg-green-700">
        Add Plant
      </button>
    </form>
  );
}

export default NewPlantForm;