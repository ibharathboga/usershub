import { toast } from "react-toastify";
import { useUsersContext } from "../UsersProvider";
import iaxios from "../utils/axios";
import { useState } from "react";

export default function useUsersMutation() {
  const { setUsers } = useUsersContext();

  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);

  const editUser = async ({ id, updatedFields }) => {
    const toastId = toast.loading("Updating user...", { position: "bottom-right" });
    setIsEditLoading(true);
    try {
      const response = await iaxios.put(`/users/${id}`, updatedFields);
      const updatedUser = response.data;
      setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));

      toast.update(toastId, {
        render: "User updated!",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });
    } catch (error) {
      toast.update(toastId, {
        render: error?.message || "Something went wrong...",
        type: "error",
        isLoading: false,
        autoClose: 2000
      });
      console.error(error);
    } finally {
      setIsEditLoading(false);
    }
  };

  const deleteUser = async ({ id }) => {
    const toastId = toast.loading("Deleting user...", { position: "bottom-right" });
    setIsDeleteLoading(true);
    try {
      await iaxios.delete(`/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));

      toast.update(toastId, {
        render: "User deleted!",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });
    } catch (error) {
      toast.update(toastId, {
        render: error?.message || "Something went wrong...",
        type: "error",
        isLoading: false,
        autoClose: 2000
      });
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const addUser = async ({ user }) => {
    const toastId = toast.loading("Adding user...", { position: "bottom-right" });
    setIsAddLoading(true);
    try {
      const response = await iaxios.post(`/users`, user);
      const createdUser = response.data;
      setUsers(prev => [...prev, createdUser]);

      toast.update(toastId, {
        render: "User created!",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });
    } catch (error) {
      toast.update(toastId, {
        render: error?.message || "Something went wrong...",
        type: "error",
        isLoading: false,
        autoClose: 2000
      });
      console.error(error);
    } finally {
      setIsAddLoading(false);
    }
  };

  return {
    addUser,
    isAddLoading,
    editUser,
    isEditLoading,
    deleteUser,
    isDeleteLoading
  };
}
