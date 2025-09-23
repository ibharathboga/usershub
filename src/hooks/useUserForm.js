import { useState } from "react";

function useUserForm() {
  const [formVisible, setFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleAddClick = () => {
    console.log('handleAddClick');
    setEditingUser(null);
    setFormVisible(true);
  };

  const handleEditClick = (user) => {
    console.log(user.id);
    setEditingUser(user);
    setFormVisible(true);
  };

  const onCancel = () => {
    setFormVisible(false);
    setEditingUser(null);
  }

  return {
    setFormVisible,
    setEditingUser,
    handleAddClick,
    handleEditClick,
    formVisible,
    editingUser, onCancel
  };
}

export default useUserForm;
