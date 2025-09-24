import { useState } from "react";
import useUsersMutation from "./useUsersMutation";
import { toast } from "react-toastify";

export default function useUserActions() {
  const [editTargetId, setEditTargetId] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const {
    addUser,
    editUser,
    deleteUser,
    isAddLoading,
    isEditLoading,
    isDeleteLoading,
  } = useUsersMutation();

  const handleAddUser = async (user) => {
    try {
      const newUser = await addUser({ user });
      console.log("added user:");
      console.log(newUser);
      return newUser;
    } catch (err) {
      toast.error(err?.message ?? "something went wrong...", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark",
      });
      throw err;
    }
  };

  const handleEditUser = async (id, updatedFields) => {
    console.log(updatedFields);
    setEditTargetId(id);
    try {
      const updatedUser = await editUser({ id, updatedFields });
      console.log("edited user:");
      console.log(updatedUser);
      return updatedUser;
    } catch (err) {
      toast.error(err?.message ?? "something went wrong...", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark",
      });
      throw err;
    } finally {
      setEditTargetId(null);
    }
  };

  const handleDeleteUser = async (id) => {
    setDeleteTargetId(id);
    try {
      const deletedId = await deleteUser({ id });
      console.log("deleted user id:");
      console.log(deletedId);
      return deletedId;
    } catch (err) {
      toast.error(err?.message ?? "something went wrong...", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark",
      });
      throw err;
    } finally {
      setDeleteTargetId(null);
    }
  }

  return {
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    isAddLoading,
    isEditLoading,
    isDeleteLoading,
    editTargetId,
    deleteTargetId
  };
}
