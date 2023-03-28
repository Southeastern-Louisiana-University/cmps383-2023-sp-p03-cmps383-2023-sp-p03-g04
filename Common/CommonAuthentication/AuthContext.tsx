import React, { useState, useEffect, createContext, useContext } from "react";
import { User } from "../CommonTypes/UserTypes";
import { getCurrentUser } from "../CommonFunctions/Queries/UserQueries";
import { Api } from "../CommonFunctions/ApiConfig";

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

/**
 * Hook that returns the current authentication context.
 * @returns {AuthContextValue} The authentication context value containing user data and auth functions
 * @throws {Error} If the hook is not used within an AuthProvider
 */

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}

/**
 * Authentication context provider component that wraps its children components and provides authentication-related data and functions to them.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 *
 * @returns {JSX.Element} The authentication context provider component.
 */
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
				setUser(data);
			} else {
				throw Error;
			}
		} catch {
			throw Error;
		}
	}

	async function register(inputData: Registration) {
		try {
			const { data, status } = await Api.post<User>("/users", inputData);

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
