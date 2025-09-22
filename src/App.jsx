import "./App.css";
import useUsers from "./hooks/useUsers";

export default function App() {
  const { users, loading, addUser, editUser, deleteUser } = useUsers();

  const baseUser = {
    name: "john snow",
    email: "johnsnow@gmail.com",
    company: { name: "gameofthrones" },
  };

  return (
    <div className="p-4">
      <p className="mb-4">loading: {String(loading)}</p>

      <div className="flex flex-col gap-2">
        <button
          className="border px-2 py-1"
          onClick={() =>
            addUser({ ...baseUser, name: "random-user@" + Date.now(), id: String(Date.now()) })
          }
        >
          ➕ Add User
        </button>

        <button
          onClick={() =>
            editUser({ userId: 1758516065792, showSuccess: true, updatedFields: { email: "snowjohn@gmail.com", name: "edited-name@" + Date.now() } })
          }
          className="border px-2 py-1"
        >
          Edit User (1758516065792)
        </button>


        <button
          className="border px-2 py-1"
          onClick={() => deleteUser(1758516065792)}
        >
          🗑️ Delete User (id {1758516065792})
        </button>
      </div>
      <h2 className="font-bold">Users</h2>
      <pre className="border p-2 bg-gray-100 mb-4">
        {JSON.stringify(users, null, 2)}
      </pre>
    </div >
  );
}
