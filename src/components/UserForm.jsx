import { useState } from "react";
import { useUsersControlContext } from "../UsersControlProvider";

const validateUserData = ({ first_name, last_name, email, department }) => {
  const errors = {};

  if (!first_name || first_name.trim().length < 2) {
    errors.first_name = "First name must be at least 2 characters.";
  } else if (!/^[A-Za-z\s]+$/.test(first_name)) {
    errors.first_name = "First name must contain only letters.";
  }

  if (!last_name || last_name.trim().length < 2) {
    errors.last_name = "Last name must be at least 2 characters.";
  } else if (!/^[A-Za-z\s]+$/.test(last_name)) {
    errors.last_name = "Last name must contain only letters.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    errors.email = "Email is invalid.";
  }

  if (!department || department.trim().length === 0) {
    errors.department = "Department is required.";
  } else if (!/^[A-Za-z\s]+$/.test(department)) {
    errors.department = "Department must contain only letters.";
  }

  return errors;
};

export default function UserForm() {
  const { iUserActions, formControl } = useUsersControlContext();
  const initialUser = formControl.editingUser;
  const { onCancel } = formControl;
  const [errors, setErrors] = useState({});
  if (!formControl.formVisible) return null;

  const isEdit = !!initialUser?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
      first_name: form.first_name.value.trim(),
      last_name: form.last_name.value.trim(),
      email: form.email.value.trim(),
      department: form.department.value.trim(),
    };

    const validationErrors = validateUserData(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

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
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
            )}
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
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
            )}
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
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
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
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">{errors.department}</p>
            )}
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
