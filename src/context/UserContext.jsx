import { createContext } from "react";

export const UserContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null,
});