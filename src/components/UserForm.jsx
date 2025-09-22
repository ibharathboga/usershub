import { useState } from "react";
import { toast } from "react-toastify";

export default function UserForm({
  mode = "add", // "add" | "edit"
  initial = {}, // prefill data when editing
  onSubmit,
  onCancel,
  loading = false
}) {
  const [values, setValues] = useState({
    first_name: initial.first_name || "",
    last_name: initial.last_name || "",
    department: initial.department || "",
    email: initial.email || ""
  });

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const validate = () => {
    const len = (str, min, max) =>
      str.length < min || str.length > max ? `Length must be ${min}-${max}` : null;

    if (!values.first_name.trim()) return "First name is required";
    if (len(values.first_name.trim(), 2, 30)) return "First name length 2–30";
    if (!values.last_name.trim()) return "Last name is required";
    if (len(values.last_name.trim(), 2, 30)) return "Last name length 2–30";
    if (!values.department.trim()) return "Department is required";
    if (len(values.department.trim(), 2, 40)) return "Department length 2–40";
    if (!values.email.trim()) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // fixed regex
    if (!emailRegex.test(values.email)) return "Invalid email format";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error, { position: "bottom-right" });
      return;
    }
    onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col border p-4 mt-4 space-y-3 bg-gray-50 rounded"
    >
      <input
        className="p-2 border rounded"
        type="text"
        name="first_name"
        placeholder="First name"
        value={values.first_name}
        onChange={handleChange}
      />
      <input
        className="p-2 border rounded"
        type="text"
        name="last_name"
        placeholder="Last name"
        value={values.last_name}
        onChange={handleChange}
      />
      <input
        className="p-2 border rounded"
        type="text"
        name="department"
        placeholder="Department"
        value={values.department}
        onChange={handleChange}
      />
      <input
        className="p-2 border rounded"
        type="email"
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
      />

      <div className="flex space-x-3">
        <button
          className="px-4 py-2 border rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving..." : mode === "edit" ? "Update" : "Create"}
        </button>
        <button
          className="px-4 py-2 border rounded"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
