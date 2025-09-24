import { useUsersContext } from "../UsersProvider";

export default function UsersFilter({ filters, setFilters }) {
  const { users } = useUsersContext();
  const departments = Array.from(new Set(users.map((u) => u.department))).filter(Boolean);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="users-filters">
      <div className="field-filters">
        <input
          type="text"
          name="first_name"
          placeholder="Filter by first name"
          value={filters.first_name || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Filter by last name"
          value={filters.last_name || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Filter by email"
          value={filters.email || ""}
          onChange={handleChange}
        />
        <select name="department" value={filters.department || ""} onChange={handleChange}>
          <option value="">All departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
