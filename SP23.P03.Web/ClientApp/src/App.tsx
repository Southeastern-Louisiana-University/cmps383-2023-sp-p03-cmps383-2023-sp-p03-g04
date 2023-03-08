import React from "react";
import { HomePage } from "./Pages/Home/HomePage";
import "antd/dist/reset.css";
import { Button, Layout, theme } from "antd";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { MenuSider } from "./Components/HomeComponents/MenuSider";
import { AccountPage } from "./Pages/Account/AccountPage";
import { Content, Header } from "antd/es/layout/layout";

const App = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<>
			<Layout style={{ minHeight: "100vh" }}>
				<MenuSider />
				<Layout className="site-layout">
					<Header
						style={{
							padding: 0,
							background: "rgba(0,21,41)",
						}}
					/>
					<Content
						style={{
							margin: "0 16px",
							background: colorBgContainer,
						}}
					>
						<div
							style={{
								padding: 24,
								minHeight: 360,
								background: colorBgContainer,
							}}
						></div>
					</Content>
				</Layout>
			</Layout>
		</>
	);
};

export default App;
