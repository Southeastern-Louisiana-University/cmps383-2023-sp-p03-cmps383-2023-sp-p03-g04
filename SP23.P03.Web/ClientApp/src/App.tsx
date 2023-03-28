import React from "react";
import "antd/dist/reset.css";
import { Layout } from "antd";
import { MenuSider } from "./Components/HomeComponents/MenuSider";
import { Content, Header } from "antd/es/layout/layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./Pages/Home/Home";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <HomePage />,
		},
	]);

	return (
		<>
			<Layout style={{ minHeight: "100vh" }}>
				<MenuSider />
				<Layout className="site-layout">
					<Header
						style={{
							paddingLeft: 0,
							background: "#3223d3",
							position: "sticky",
							zIndex: 9999,
						}}
					/>
					<Content
						style={{
							background: "white",
						}}
					>
						<div
							style={{
								padding: 24,
								minHeight: 360,
								maxWidth: 1400,
							}}
						>
							<RouterProvider router={router} />
						</div>
					</Content>
				</Layout>
			</Layout>
		</>
	);
};

export default App;
