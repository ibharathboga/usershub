import { Edit, Loader2, Trash } from "lucide-react";
import { useUsersControlContext } from "../UsersControlProvider";

export default function UserRow({ user }) {
  const { iUserActions, formControl } = useUsersControlContext();
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