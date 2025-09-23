export default function UserForm({
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
    <div className="fixed inset-0 bg-gray-50/75 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onCancel}
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
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
      </div>
    </div>
  );
}
