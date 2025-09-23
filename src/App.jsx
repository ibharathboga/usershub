import { useState, useEffect } from "react";
import { Plus, Edit, Trash, Loader2, InfinityIcon } from "lucide-react";
import iaxios from "./utils/axios";
import useUserActions from "./hooks/useUserActions";
import { useUsersContext } from "./UsersProvider";
import useUserForm from "./hooks/useUserForm";

function UserRow({ user, iUserActions, formControl }) {
  const {
    handleDeleteUser,
    editTargetId,
    deleteTargetId,
    isEditLoading,
    isDeleteLoading,
  } = iUserActions;

  const isEditing = user.id === editTargetId;
  const isDeleting = user.id === deleteTargetId;

  const { handleEditClick } = formControl;

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="p-3 border-b">{user.id}</td>
      <td className="p-3 border-b">{user.first_name}</td>
      <td className="p-3 border-b">{user.last_name}</td>
      <td className="p-3 border-b">{user.email}</td>
      <td className="p-3 border-b">{user.department}</td>
      <td className="p-3 border-b flex gap-2">
        <button
          className="p-2 rounded hover:bg-gray-200"
          onClick={() => handleEditClick(user)}
          disabled={isEditing || isEditLoading}
        >
          {isEditing ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Edit size={16} />
          )}
        </button>
        <button
          className="p-2 rounded hover:bg-red-100 text-red-500"
          onClick={() => handleDeleteUser(user.id)}
          disabled={isDeleting || isDeleteLoading}
        >
          {isDeleting ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Trash size={16} />
          )}
        </button>
      </td>
    </tr>
  );
}

function UserCard({ user, iUserActions, formControl }) {
  const {
    handleDeleteUser,
    editTargetId,
    deleteTargetId,
    isEditLoading,
    isDeleteLoading,
  } = iUserActions;

  const isEditing = user.id === editTargetId;
  const isDeleting = user.id === deleteTargetId;
  const { handleEditClick } = formControl;

  return (
    <div className="flex flex-col justify-between p-4 border rounded shadow-sm hover:shadow-md transition">
      <p>
        <span className="font-semibold">ID:</span> {user.id}
      </p>
      <p>
        <span className="font-semibold">First Name:</span> {user.first_name}
      </p>
      <p>
        <span className="font-semibold">Last Name:</span> {user.last_name}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {user.email}
      </p>
      <p>
        <span className="font-semibold">Department:</span> {user.department}
      </p>
      <div className="flex gap-2 mt-2">
        <button
          className="p-2 rounded hover:bg-gray-200"
          onClick={() => handleEditClick(user)}
          disabled={isEditing || isEditLoading}
        >
          {isEditing ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Edit size={16} />
          )}
        </button>
        <button
          className="p-2 rounded hover:bg-red-100 text-red-500"
          onClick={() => handleDeleteUser(user.id)}
          disabled={isDeleting || isDeleteLoading}
        >
          {isDeleting ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Trash size={16} />
          )}
        </button>
      </div>
    </div>
  );
}

export function UserForm({
  visible = false,
  initialUser = null,
  iUserActions,
  onCancel,
}) {
  if (!visible) return null;
  const isEdit = !!initialUser?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      department: form.department.value,
    };

    try {
      if (isEdit) {
        const { handleEditUser } = iUserActions;
        await handleEditUser(initialUser.id, data);
      } else {
        const { handleAddUser } = iUserActions;
        await handleAddUser(data);
      }
    } finally {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block font-semibold mb-1">First Name</label>
        <input
          type="text"
          name="first_name"
          defaultValue={initialUser?.first_name}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Last Name</label>
        <input
          type="text"
          name="last_name"
          defaultValue={initialUser?.last_name}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Email</label>
        <input
          type="email"
          name="email"
          defaultValue={initialUser?.email}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Department</label>
        <input
          type="text"
          name="department"
          defaultValue={initialUser?.department}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {initialUser ? "Update User" : "Add User"}
        </button>
      </div>
    </form>
  );
}

export default function App() {
  const { users, setUsers } = useUsersContext();
  const [loading, setLoading] = useState(true);

  const iUserActions = useUserActions();

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

  const formControl = useUserForm();

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

      <UserForm
        visible={formControl.formVisible}
        initialUser={formControl.editingUser}
        iUserActions={iUserActions}
        onCancel={formControl.onCancel}
      />

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
                  <UserRow
                    key={user.id}
                    user={user}
                    iUserActions={iUserActions}
                    formControl={formControl}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                iUserActions={iUserActions}
                formControl={formControl}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
