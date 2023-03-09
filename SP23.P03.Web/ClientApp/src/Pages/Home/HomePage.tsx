import { Breadcrumb, Button, Layout, Modal, theme } from "antd";
import "antd/dist/reset.css";
import { Header, Content, Footer } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { MenuSider } from "../../Components/HomeComponents/MenuSider";
import { HomeContent } from "../../Components/HomeComponents/HomeContent";

export const HomePage = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Layout className="site-layout">
				<Header
					style={{
						padding: 0,
						background: "rgba(0,21,41)",
					}}
				/>
				<Content
					style={{ margin: "0 16px", background: colorBgContainer }}
				>
					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: colorBgContainer,
						}}
					>
						<HomeContent />
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};
