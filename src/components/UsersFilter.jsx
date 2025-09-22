export default function UsersFilter({ search, setSearch, filterDepartment, setFilterDepartment, departments }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <input
        className="p-2 border rounded flex-1 min-w-[200px]"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select
        className="p-2 border rounded"
        value={filterDepartment}
        onChange={e => setFilterDepartment(e.target.value)}
      >
        <option value="">All Departments</option>
        {departments.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
    </div>
  );
}
