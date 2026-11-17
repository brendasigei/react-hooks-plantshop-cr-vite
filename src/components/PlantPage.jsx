import { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const PLANTS_URL = "http://localhost:6001/plants";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(PLANTS_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load plants.");
        }
        return response.json();
      })
      .then(setPlants)
      .catch(() => setError("Plants could not be loaded. Please try again."));
  }, []);

  async function handleAddPlant(plant) {
    const response = await fetch(PLANTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plant),
    });

    if (!response.ok) {
      throw new Error("Unable to add plant.");
    }

    const savedPlant = await response.json();
    setPlants((currentPlants) => [...currentPlants, savedPlant]);
    setError("");
  }

  function handleToggleStock(plantId) {
    setPlants((currentPlants) =>
      currentPlants.map((plant) =>
        plant.id === plantId
          ? { ...plant, inStock: plant.inStock === false }
          : plant,
      ),
    );
  }

  const visiblePlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {error && <p role="alert" className="error-message">{error}</p>}
      <PlantList plants={visiblePlants} onToggleStock={handleToggleStock} />
    </main>
  );
}

export default PlantPage;
