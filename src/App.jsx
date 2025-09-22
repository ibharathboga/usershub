import { useState, useMemo } from "react";
import { useUsersContext } from "./UsersProvider";
import useUsersQuery from "./hooks/useUsersQuery";
import useUsersMutation from "./hooks/useUsersMutation";
import UserForm from "./components/UserForm";

export default function App() {
  const { users } = useUsersContext();
  const { isFetchLoading } = useUsersQuery();
  const { addUser, isAddLoading, editUser, isEditLoading, deleteUser, isDeleteLoading } =
    useUsersMutation();

  const [adding, setAdding] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [filterDepartment, setFilterDepartment] = useState("");

  const handleAdd = async (vals) => {
    await addUser({ user: vals });
    setAdding(false);
  };

  const handleEdit = async (vals) => {
    await editUser({ id: editingUser.id, updatedFields: vals });
    setEditingUser(null);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    await deleteUser({ id });
    setDeletingId(null);
  };

  // for filter and sort, useMemo
  const displayedUsers = useMemo(() => {
    let data = [...users];

    // filter
    if (filterDepartment) {
      data = data.filter(u => u.department === filterDepartment);
    }

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(u =>
        u.first_name.toLowerCase().includes(q) ||
        u.last_name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q)
      );
    }

    // to sort
    if (sortField) {
      data.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortAsc ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortAsc ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [users, search, sortField, sortAsc, filterDepartment]);

  // filter dropdown for departments options
  const departments = Array.from(new Set(users.map(u => u.department)));

  if (isFetchLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-2">Users Dashboard</h2>

      <div className="border-2 border-blue-500 rounded-sm p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Users</h2>
          <button
            className="px-3 py-1 border rounded bg-blue-50"
            onClick={() => setAdding(true)}
          >
            + Add User
          </button>
        </div>

        {/* search / filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            className="p-2 border rounded flex-1 min-w-[200px]"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-2 border rounded"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* users table */}
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
              {displayedUsers.map(u => (
                <tr key={u.id}>
                  <td className="border px-3 py-1">{u.first_name}</td>
                  <td className="border px-3 py-1">{u.last_name}</td>
                  <td className="border px-3 py-1">{u.department}</td>
                  <td className="border px-3 py-1">{u.email}</td>
                  <td className="border px-3 py-1">
                    <button
                      className="px-2 py-1 border rounded mr-2"
                      onClick={() => setEditingUser(u)}
                    >
                      Edit
                    </button>
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
              {displayedUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-2 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* modals */}
      {adding && (
        <Modal onClose={() => setAdding(false)}>
          <UserForm mode="add" onSubmit={handleAdd} onCancel={() => setAdding(false)} loading={isAddLoading} />
        </Modal>
      )}
      {editingUser && (
        <Modal onClose={() => setEditingUser(null)}>
          <UserForm
            mode="edit"
            initial={editingUser}
            onSubmit={handleEdit}
            onCancel={() => setEditingUser(null)}
            loading={isEditLoading}
          />
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg relative max-w-md w-full">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-1 rounded-full"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
