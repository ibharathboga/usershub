import { useState } from "react";
import { useUsersContext } from "../UsersProvider";
import iaxios from "../utils/axios";

export default function useUsersMutation() {
  const { setUsers } = useUsersContext();

  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);

  const addUser = async ({ user }) => {
    setIsAddLoading(true);
    try {
      const { data: createdUser } = await iaxios.post(`/users`, user);
      setUsers(prev => [...prev, createdUser]);
      return createdUser;
    } finally {
      setIsAddLoading(false);
    }
  };

  const deleteUser = async ({ id }) => {
    setIsDeleteLoading(true);
    try {
      await iaxios.delete(`/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
      return id;
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const editUser = async ({ id, updatedFields }) => {
    setIsEditLoading(true);
    try {
      const { data: updatedUser } = await iaxios.put(`/users/${id}`, updatedFields);
      setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));
      return updatedUser;
    } finally {
      setIsEditLoading(false);
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
