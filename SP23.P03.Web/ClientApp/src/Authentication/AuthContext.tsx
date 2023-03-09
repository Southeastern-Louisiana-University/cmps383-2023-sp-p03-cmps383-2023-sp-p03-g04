import React, { useState, useEffect, createContext, useContext } from "react";
import { User } from "../Data/Types/UserTypes";
import { getCurrentUser } from "../Data/Queries/UserQueries";
import { Api } from "../Config";

type AuthContextValue = {
	user: User | null;
	login: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
	user: null,
	login: () => Promise.resolve(),
	logout: () => Promise.resolve(),
});

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}

export const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		setUser(getCurrentUser);
	}, []);

	async function login(username: string, password: string) {
		try {
			const { data, status } = await Api.post<User>(
				"/authentication/login",
				{ username, password }
			);

			if (status === 200) {
				console.log(data);
				setUser(data);
			} else {
				throw Error;
			}
		} catch {
			throw Error;
		}
	}

	async function logout() {
		setUser(null);
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
