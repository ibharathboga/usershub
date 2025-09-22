import { useState, useEffect } from "react";
import iaxios from "../utils/axios";
import { useUsersContext } from "../UsersProvider";

export default function useUsers() {
  const { users, setUsers } = useUsersContext();

  const [status, setStatus] = useState({
    fetch: { loading: false, error: null },
    create: { loading: false, error: null },
    update: { loading: false, error: null },
    delete: { loading: false, error: null },
  });

  const setLoading = (op, value) =>
    setStatus(prev => ({ ...prev, [op]: { ...prev[op], loading: value } }));

  const setError = (op, value) =>
    setStatus(prev => ({ ...prev, [op]: { ...prev[op], error: value } }));

  const fetchUsers = async () => {
    setLoading("fetch", true);
    setError("fetch", null);
    try {
      const res = await iaxios.get("/users");
      setUsers(res.data);
    } catch (err) {
      setError("fetch", err);
    } finally {
      setLoading("fetch", false);
    }
  };

  const createUser = async (newUser) => {
    setLoading("create", true);
    setError("create", null);
    try {
      const res = await iaxios.post("/users", newUser);
      setUsers([...users, res.data]);
      return res.data;
    } catch (err) {
      setError("create", err);
      throw err;
    } finally {
      setLoading("create", false);
    }
  };

  const updateUser = async (id, updatedFields) => {
    setLoading("update", true);
    setError("update", null);
    try {
      const res = await iaxios.put(`/users/${id}`, updatedFields);
      setUsers(users.map(u => (u.id === id ? res.data : u)));
      return res.data;
    } catch (err) {
      setError("update", err);
      throw err;
    } finally {
      setLoading("update", false);
    }
  };

  const deleteUser = async (id) => {
    setLoading("delete", true);
    setError("delete", null);
    try {
      await iaxios.delete(`/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      setError("delete", err);
      throw err;
    } finally {
      setLoading("delete", false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    status,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  };
}
