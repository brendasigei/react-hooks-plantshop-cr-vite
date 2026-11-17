function Search({ search, onSearchChange }) {
  return (
    <div className="mb-6">
      <input
        className="w-full rounded border p-2"
        type="text"
        placeholder="Type a name to search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default Search;