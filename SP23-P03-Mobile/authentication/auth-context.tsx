import React, { useState, useEffect, createContext, useContext } from "react";
import { User } from "../data/types/user-types";
import { getCurrentUser } from "../data/queries/user-queries";
import { BaseUrl } from "../Config";

type AuthContextValue = {
	user: User | null;
	login: (username: string, password: string) => Promise<void>;
	register: (inputData: Registration) => Promise<void>;
	logout: () => Promise<void>;
};

type Registration = {
	username: string;
	password: string;
	firstname: string;
	lastname: string;
	address: string;
	email: string;
	roles: Array<string>;
};

const AuthContext = createContext<AuthContextValue>({
	user: null,
	login: () => Promise.resolve(),
	register: () => Promise.resolve(),
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
			const { data, status } = await BaseUrl.post<User>(
				"/authentication/login",
				{ username, password }
			);

			if (status === 200) {
				setUser(data);
				console.log(data);
			} else {
				throw Error;
			}
		} catch {
			throw Error;
		}
	}

	async function register(inputData: Registration) {
		try {
			const { data, status } = await BaseUrl.post<User>("/users", inputData);

			if (status === 200) {
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
		<AuthContext.Provider value={{ user, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
};