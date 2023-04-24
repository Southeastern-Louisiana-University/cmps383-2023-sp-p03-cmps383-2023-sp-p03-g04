import React, { useState, useEffect, createContext, useContext } from "react";
import { Api } from "../Config";

export const useApiData = <TDataType>(endpoint: string) => {
	const [data, setData] = useState<any | null | undefined>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null | undefined>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await Api.get<TDataType>(endpoint);
				setData(response.data);
			} catch (error) {
				setError(error as Error | null);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [endpoint]);

	return { data, loading, error };
};
