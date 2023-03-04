import React, { useState, useEffect, createContext, useContext } from "react";
import { GetUserResponse, User } from "../Data/Types/UserTypes";
import { getCurrentUser } from "../Data/Queries/Query";
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
		const { data, status } = await Api.post<GetUserResponse>(
			"/authentication/login",
			{ username, password }
		);

		if (status === 200) setUser(data.user);
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
