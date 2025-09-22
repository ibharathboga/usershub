import { useEffect, useState } from "react";
import iaxios from "../utils/axios";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const request = async (fn, updateState) => {
    setLoading(true);
    try {
      const response = await fn();
      console.log(response);
      updateState(response.data);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = () => request(
    () => iaxios.get("/"),
    (data) => setUsers(data)
  );

  const addUser = (user) => request(
    // always gives success response
    // does not consider the id we set in the user object,
    // id is just set to 11
    // had to set userId for later operations
    () => iaxios.post("/", { ...user, userId: Number(String(String(Date.now()))) }),
    (newUser) => setUsers(prev => [...prev, newUser])
  );

  // eslint-disable-next-line no-unused-vars
  const usersUpdateFn = ({ userId, updatedFields, _ }) => {
    const user = users.find(u => u.id === userId || u.userId === userId)
    const updatedUser = { ...user, ...updatedFields }
    setUsers(prev => prev.map(x => (userId === x.id || userId === x.userId) ? updatedUser : x))
  }
  const editUser = ({ userId, updatedFields, showSuccess }) => request(
    () => iaxios.put(`/${showSuccess ? 1 : 111}`, updatedFields),
    (_) => usersUpdateFn({ userId, updatedFields, _ })
  );

  const deleteUser = (userId) => request(
    // this always gives success state regardless of userId
    () => iaxios.delete(`/${userId}`),
    () => setUsers(prev => prev.filter(x => x.userId !== userId && x.id !== userId))
  );

  useEffect(() => { fetchUsers(); }, []);

  return { users, setUsers, loading, fetchUsers, addUser, editUser, deleteUser };
}
