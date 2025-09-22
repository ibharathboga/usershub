import { useState, useEffect } from "react";
import iaxios from "../utils/axios";
import { useUsersContext } from "../UsersProvider";
import { toast } from "react-toastify";

export default function useUsersQuery() {
  const { setUsers } = useUsersContext();
  const [loading, setIsLoading] = useState(true);

  const fetchFn = async () => {
    setIsLoading(true);
    const itoast = toast.loading('fetching users..', { position: 'bottom-right' })
    try {
      const response = await iaxios.get("/users")
      setUsers(response.data);
      toast.update(itoast, {
        render: "users list fetched!",
        type: "success",
        isLoading: false,
        autoClose: 2000
      })
    } catch (error) {
      toast.update(itoast, {
        render: error?.message || "something went wrong...",
        type: "error",
        isLoading: false,
        autoClose: 2000
      })
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetchFn(); }, [])

  return { isFetchLoading: loading };
}
