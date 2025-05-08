import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../common/types/User";

type UserContextType = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string>("");

    return (
        <UserContext.Provider value= {{ user, setUser, token, setToken }}>
                { children }
        </UserContext.Provider>
  );
};


const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};

export { UserProvider, UserContext, useUser };