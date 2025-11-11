function Toolbar({ filters, selected, onSelectFilter }) {
  return (
    <div className="toolbar">
      {filters.map((item) => (
        <button
          className={selected == item ? "btn btn-accent" : "btn"}
          onClick={() => onSelectFilter(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default Toolbar;
