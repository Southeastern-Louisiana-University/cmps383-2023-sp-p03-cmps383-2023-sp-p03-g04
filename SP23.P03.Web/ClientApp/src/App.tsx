import React from "react";
import { HomePage } from "./Pages/Home/HomePage";
import { Button } from "antd";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

const App = () => (
	<>
		<BrowserRouter>
			<Routes>
				<Route element={<HomePage />} path="/home" />
			</Routes>
		</BrowserRouter>
	</>
);

export default App;
