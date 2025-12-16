export const FilterBar = ({
  searchTerm,
  setSearchTerm,
  selectedStyle,
  setSelectedStyle,
  allStyles,
}) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by name or brand..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <select
        className="style-filter"
        value={selectedStyle}
        onChange={(e) => setSelectedStyle(e.target.value)}
      >
        <option value="">All Style</option>
        {allStyles.map((style) => (
          <option key={style.id} value={style.id}>
            {style.name}
          </option>
        ))}
      </select>
    </div>
  );
};
