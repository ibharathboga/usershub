import UserForm from "./UserForm";

export default function UsersModals({ adding, setAdding, editingUser, setEditingUser, handleAdd, handleEdit, isAddLoading, isEditLoading }) {
  return (
    <>
      {adding && (
        <Modal onClose={() => setAdding(false)}>
          <UserForm mode="add" onSubmit={handleAdd} onCancel={() => setAdding(false)} loading={isAddLoading} />
        </Modal>
      )}
      {editingUser && (
        <Modal onClose={() => setEditingUser(null)}>
          <UserForm
            mode="edit"
            initial={editingUser}
            onSubmit={handleEdit}
            onCancel={() => setEditingUser(null)}
            loading={isEditLoading}
          />
        </Modal>
      )}
    </>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg relative max-w-md w-full">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-1 rounded-full"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
