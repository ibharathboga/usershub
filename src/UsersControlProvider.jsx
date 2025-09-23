import useUserActions from "./hooks/useUserActions";
import useUserForm from "./hooks/useUserForm";

import { createContext, useContext, } from "react";


const UsersControlContext = createContext(null);

export function UsersControlProvider({ children }) {

  const iUserActions = useUserActions();
  const formControl = useUserForm();

  return (
    <UsersControlContext.Provider value={{ iUserActions, formControl }}>
      {children}
    </UsersControlContext.Provider>
  );
}

export const useUsersControlContext = () => useContext(UsersControlContext);