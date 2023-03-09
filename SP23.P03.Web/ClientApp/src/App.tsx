import React from "react";
import "antd/dist/reset.css";
import { Layout, theme } from "antd";
import { MenuSider } from "./Components/HomeComponents/MenuSider";
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
