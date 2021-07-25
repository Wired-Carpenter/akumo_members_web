import { useContext, createContext } from "react";

const UserContext = createContext({});

export const useUserContext = useContext(UserContext);
