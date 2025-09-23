import { useEffect } from "react";
import "./App.css";
import useUsersMutation from "./hooks/useUsersMutation";
import { useUsersContext } from "./UsersProvider";
import iaxios from "./utils/axios";

function App() {
  const demoUser = { first_name: "Alice", last_name: "Doe", email: "alice@example.com" };
  const { users, setUsers } = useUsersContext();
  const { addUser, editUser, deleteUser, isAddLoading, isEditLoading, isDeleteLoading } = useUsersMutation();

  const fetchUsers = async () => {
    try {
      const { data } = await iaxios.get("/users");
      setUsers(data);
    } catch (err) {
      console.error("failed to fetch users:");
      console.error(err);
    }
  };
  useEffect(() => { fetchUsers(); }, []);

  const handleAdd = async () => {
    try {
      const newUser = await addUser({ user: demoUser });
      console.log("added user:");
      console.log(newUser);
    } catch (err) {
      console.error("failed to add user:");
      console.error(err);
    }
  };

  const handleEdit = async () => {
    if (users.length === 0) return;
    try {
      const updatedUser = await editUser({ id: users[0].id, updatedFields: { first_name: "Bob" } });
      console.log("edited user:");
      console.log(updatedUser);
    } catch (err) {
      console.error("failed to edit user:");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (users.length === 0) return;
    try {
      const deletedId = await deleteUser({ id: users[0].id });
      console.log("deleted user id:");
      console.log(deletedId);
    } catch (err) {
      console.error("failed to delete user:");
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-red-500 flex flex-col m-4 p-4 gap-2 ">
      <h2 className="text-center">Users Demo</h2>
      <button onClick={handleAdd} disabled={isAddLoading}>
        {isAddLoading ? "Adding..." : "Add User"}
      </button>
      <button onClick={handleEdit} disabled={isEditLoading || users.length === 0}>
        {isEditLoading ? "Editing..." : "Edit First User"}
      </button>
      <button onClick={handleDelete} disabled={isDeleteLoading || users.length === 0}>
        {isDeleteLoading ? "Deleting..." : "Delete First User"}
      </button>

      <pre className="mt-4 bg-gray-100 p-2">
        {JSON.stringify(users, null, 2)}
      </pre>
    </div>
  );
}

export default App;
