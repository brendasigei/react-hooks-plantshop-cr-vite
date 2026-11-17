import { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all plants once when the page loads
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  // Add a newly created plant to state so it renders immediately
  function addPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  // Filter by name, case-insensitive; an empty search matches every plant
  const visiblePlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="mx-auto max-w-5xl p-6">
      <NewPlantForm onAddPlant={addPlant} />
      <Search search={search} onSearchChange={setSearch} />
      <PlantList plants={visiblePlants} />
    </main>
  );
}

export default PlantPage;