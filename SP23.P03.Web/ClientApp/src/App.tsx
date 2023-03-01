import React from "react";
import {
	Route,
	RouterProvider,
	Routes,
	createBrowserRouter,
} from "react-router-dom";
import { HomePage } from "./Pages/Home/HomePage";
import { Button } from "antd";

const router = createBrowserRouter([
	{
		path: "/home",
		element: <HomePage />,
	},
]);

const App = () => {
	return (
		<>
			<HomePage />
		</>
	);
};

export default App;
