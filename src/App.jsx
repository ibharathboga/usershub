import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import UserForm from "./components/UserForm";
import UserRow from "./components/UserRow";
import { useUsersControlContext } from "./UsersControlProvider";
import { useUsersContext } from "./UsersProvider";
import iaxios from "./utils/axios";

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

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <>
          <div className="hidden md:block">
            <table className="min-w-full border border-gray-200 rounded shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left border-b">ID</th>
                  <th className="p-3 text-left border-b">First Name</th>
                  <th className="p-3 text-left border-b">Last Name</th>
                  <th className="p-3 text-left border-b">Email</th>
                  <th className="p-3 text-left border-b">Department</th>
                  <th className="p-3 text-left border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
