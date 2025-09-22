export default function UsersTable({
  users,
  setEditingUser,
  handleDelete,
  deletingId,
  isDeleteLoading,
  sortField,
  sortAsc,
  setSortField,
  setSortAsc
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            {["first_name", "last_name", "department", "email"].map(field => (
              <th
                key={field}
                className="border px-3 py-2 cursor-pointer select-none"
                onClick={() => {
                  if (sortField === field) setSortAsc(!sortAsc);
                  else { setSortField(field); setSortAsc(true); }
                }}
              >
                {field.replace("_", " ").toUpperCase()} {sortField === field ? (sortAsc ? "↑" : "↓") : "↑↓"}
              </th>
            ))}
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td className="border px-3 py-1">{u.first_name}</td>
              <td className="border px-3 py-1">{u.last_name}</td>
              <td className="border px-3 py-1">{u.department}</td>
              <td className="border px-3 py-1">{u.email}</td>
              <td className="border px-3 py-1">
                <button className="px-2 py-1 border rounded mr-2" onClick={() => setEditingUser(u)}>Edit</button>
                <button
                  className="px-2 py-1 border rounded text-red-600"
                  disabled={deletingId === u.id && isDeleteLoading}
                  onClick={() => handleDelete(u.id)}
                >
                  {deletingId === u.id && isDeleteLoading ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-2 text-gray-500">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
