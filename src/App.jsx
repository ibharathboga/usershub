import { useState } from "react";
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

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-2">Users Dashboard</h2>

      <div className="border-2 border-blue-500 rounded-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Users</h2>
          <button className="px-3 py-1 border rounded bg-blue-50" onClick={() => setAdding(true)}>
            + Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-3 py-2">First Name</th>
                <th className="border px-3 py-2">Last Name</th>
                <th className="border px-3 py-2">Department</th>
                <th className="border px-3 py-2">Email</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
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
            </tbody>
          </table>
        </div>
      </div>

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
