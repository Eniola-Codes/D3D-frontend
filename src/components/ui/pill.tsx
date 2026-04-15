const Pill = ({
  option,
  handleFilterChange,
  search,
}: {
  option: string;
  handleFilterChange: (filterKey: string, value: string) => void;
  search: string;
}) => {
  return (
    <button
      onClick={() => handleFilterChange('search', option)}
      className={`cursor-pointer rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
        search === option
          ? 'bg-accent text-accent-foreground border-accent border'
          : 'bg-card text-foreground border-border hover:bg-accent/10 border'
      }`}
    >
      {option}
    </button>
  );
};

export default Pill;
