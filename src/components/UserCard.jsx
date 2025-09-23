import { Edit, Loader2, Trash } from "lucide-react";

export default function UserCard({ user, iUserActions, formControl }) {
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