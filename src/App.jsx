import { useState, useMemo } from "react";
import { useUsersContext } from "./UsersProvider";
import useUsersQuery from "./hooks/useUsersQuery";
import useUsersMutation from "./hooks/useUsersMutation";
import UsersTable from "./components/UsersTable";
import UsersFilter from "./components/UsersFilter";
import UsersModals from "./components/UsersModals";

export default function App() {
  const { users } = useUsersContext();
  const { isFetchLoading } = useUsersQuery();
  const { addUser, isAddLoading, editUser, isEditLoading, deleteUser, isDeleteLoading } =
    useUsersMutation();

  const [adding, setAdding] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [filterDepartment, setFilterDepartment] = useState("");

  const handleAdd = async (vals) => {
    await addUser({ user: vals });
    setAdding(false);
  };

  const handleEdit = async (vals) => {
    await editUser({ id: editingUser.id, updatedFields: vals });
    setEditingUser(null);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    await deleteUser({ id });
    setDeletingId(null);
  };

  const displayedUsers = useMemo(() => {
    let data = [...users];
    if (filterDepartment) data = data.filter(u => u.department === filterDepartment);
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(u =>
        u.first_name.toLowerCase().includes(q) ||
        u.last_name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q)
      );
    }
    if (sortField) {
      data.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortAsc ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortAsc ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [users, search, sortField, sortAsc, filterDepartment]);

  const departments = Array.from(new Set(users.map(u => u.department)));

  if (isFetchLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-2">Users Dashboard.</h2>

      
      <h2 className="text-2xl mb-2">
  Note: A better version can be seen at  
  <a href="https://usershub-git-dev-main-ibharathbogas-projects.vercel.app/?_vercel_share=fW0HPTw2ZoU4UI6Bia5AiqgeqxvCnNob" target="_blank">
    this link
  </a>.  
  The code is available in the <code>dev/main</code> branch with its own readme file, click <a href="https://github.com/ibharathboga/usershub/tree/dev/main" target="_blank">here</a> to get to branch
</h2>
      
      <div className="border-2 border-blue-500 rounded-sm p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Users</h2>
          <button className="px-3 py-1 border rounded bg-blue-50" onClick={() => setAdding(true)}>+ Add User</button>
        </div>
        <UsersFilter
          search={search}
          setSearch={setSearch}
          filterDepartment={filterDepartment}
          setFilterDepartment={setFilterDepartment}
          departments={departments}
        />
        <UsersTable
          users={displayedUsers}
          setEditingUser={setEditingUser}
          handleDelete={handleDelete}
          deletingId={deletingId}
          isDeleteLoading={isDeleteLoading}
          sortField={sortField}
          sortAsc={sortAsc}
          setSortField={setSortField}
          setSortAsc={setSortAsc}
        />
      </div>
      <UsersModals
        adding={adding}
        setAdding={setAdding}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        isAddLoading={isAddLoading}
        isEditLoading={isEditLoading}
      />
    </div>
  );
}
