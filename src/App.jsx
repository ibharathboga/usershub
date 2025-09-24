import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import UserForm from "./components/UserForm";
import UserRow from "./components/UserRow";
import { useUsersContext } from "./UsersProvider";
import { useUsersControlContext } from "./UsersControlProvider";
import iaxios from "./utils/axios";
import useTableData from "./hooks/useTableData";

export default function App() {
  const { users, setUsers } = useUsersContext();
  const { formControl } = useUsersControlContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await iaxios.get("/users");
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const {
    paginatedData,
    handleSort,
    handleSearch,
    handlePrev,
    handleNext,
    handleItemsPerPageChange,
    sortField,
    sortOrder,
    currentPage,
    itemsPerPage,
    searchTerm
  } = useTableData(users, { initialItemsPerPage: 5 });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading users...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          onClick={formControl.handleAddClick}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Plus size={16} /> Add User
        </button>
      </div>

      <UserForm />

      {users.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between mb-2 gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="border rounded px-2 py-1 w-full md:w-1/3"
          />

          <div className="flex items-center gap-2">
            <label className="font-medium">Show:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {[5, 10, 25, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <>
          <div className="hidden md:block">
            <table className="min-w-full border border-gray-200 rounded shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  {["id", "first_name", "last_name", "email", "department"].map(
                    (field) => (
                      <th
                        key={field}
                        className="p-3 text-left border-b cursor-pointer select-none"
                        onClick={() => handleSort(field)}
                      >
                        {field.replace("_", " ").toUpperCase()}
                        {sortField === field
                          ? sortOrder === "asc"
                            ? " ▲"
                            : " ▼"
                          : " ▲▼"}
                      </th>
                    )
                  )}
                  <th className="p-3 text-left border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            <thead className="bg-gray-100">
              <tr>
                {["id", "first_name", "last_name", "email", "department"].map(
                  (field) => (
                    <th
                      key={field}
                      className="p-3 text-left border-b cursor-pointer select-none"
                      onClick={() => handleSort(field)}
                    >
                      {field.replace("_", " ").toUpperCase()}
                      {sortField === field
                        ? sortOrder === "asc"
                          ? " ▲"
                          : " ▼"
                        : " ▲▼"}
                    </th>
                  )
                )}
              </tr>
            </thead>
            {paginatedData.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage * itemsPerPage >= users.length}
              className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
