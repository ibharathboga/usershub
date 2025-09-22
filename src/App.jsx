import { useEffect, useState } from "react";
import useUsers from "./hooks/useUsers";
import { toast } from "react-toastify";

export default function App() {
  const { users, status, createUser, updateUser, deleteUser } = useUsers();
  const [demoCounter, setDemoCounter] = useState(100);

  const handleAdd = async () => {
    const newUser = {
      first_name: `Demo${demoCounter}`,
      last_name: "User",
      department: "Demo",
      email: `demo${demoCounter}@example.com`,
    };
    try {
      await createUser(newUser);
      setDemoCounter(demoCounter + 1);
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  const handleEdit = async (user) => {
    try {
      await updateUser(user.id, { first_name: user.first_name + "_Edited" });
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Show global fetch loading/error
  if (status.fetch.loading) return <p>Loading users...</p>;
  if (status.fetch.error) return <p>Error loading users: {status.fetch.error.message}</p>;

  const notify = () => toast('Wow so easy !');


  return (
    <div style={{ padding: 20 }}>
      <h2>Users Demo</h2>
      <button onClick={notify}>toast</button>

      <button
        className="border-2 border-red-500"
        onClick={handleAdd}
        style={{ marginBottom: 10 }}
        disabled={status.create.loading}
      >
        {status.create.loading ? "Adding..." : "Add Demo User"}
      </button>

      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.first_name}</td>
              <td>{u.last_name}</td>
              <td>{u.department}</td>
              <td>{u.email}</td>
              <td>
                <button
                  onClick={() => handleEdit(u)}
                  disabled={status.update.loading}
                >
                  {status.update.loading ? "Updating..." : "Edit"}
                </button>{" "}
                <button
                  onClick={() => handleDelete(u.id)}
                  disabled={status.delete.loading}
                >
                  {status.delete.loading ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show per-op errors */}
      {status.create.error && <p style={{ color: "red" }}>Create error: {status.create.error.message}</p>}
      {status.update.error && <p style={{ color: "red" }}>Update error: {status.update.error.message}</p>}
      {status.delete.error && <p style={{ color: "red" }}>Delete error: {status.delete.error.message}</p>}
    </div>
  );
}
