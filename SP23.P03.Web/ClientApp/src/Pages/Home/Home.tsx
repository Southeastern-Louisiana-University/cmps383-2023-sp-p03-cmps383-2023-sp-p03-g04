import { Card, Layout, QRCode, theme } from "antd";
import "antd/dist/reset.css";
import { Header, Content } from "antd/es/layout/layout";
import React, { useState } from "react";

import "./HomeStyle.css";
import { PlanTab } from "../../Components/HomeComponents/CardTabs/PlanTab";
import { FindTab } from "../../Components/HomeComponents/CardTabs/FindTab";
import { StatusTab } from "../../Components/HomeComponents/CardTabs/StatusTab";

export const HomePage = () => {
	const [activeTabKey, setActiveTabKey] = useState("plan");
	const [header, setHeader] = useState("Plan your next trip!");

	const tabs = [
		{
			key: "plan",
			tab: "Plan your trip",
		},
		{
			key: "find",
			tab: "Find your ticket",
		},
		{
			key: "status",
			tab: "Train Status",
		},
	];
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const cardStyle: React.CSSProperties = {
		border: "1px solid grey",
	};

	const obj = {
		yes: "ues",
		yes1: "yes",
		yes2: "yesefs",
	};

	const onTabChange = (key: string) => {
		setActiveTabKey(key);
		if (key === "plan") {
			setHeader("Plan your next trip!");
		} else if (key === "find") {
			setHeader("Find your ticket details!");
		} else if (key === "status") {
			setHeader("Check your train status!");
		}
	};
	const renderTab = () => {
		if (activeTabKey === "plan") {
			return <PlanTab />;
		}
		if (activeTabKey === "find") {
			return <FindTab />;
		}
		if (activeTabKey === "status") {
			return <StatusTab />;
		}
	};
	return (
		<>
			<Layout style={{ background: colorBgContainer }}>
				<Header style={{ background: colorBgContainer }}>
					<h1 className="trip-header-text">{header}</h1>
				</Header>
				<Content>
					<QRCode value={JSON.stringify(obj)} />
					<QRCode value="w" />
					<Card
						bordered={true}
						style={cardStyle}
						tabList={tabs}
						onTabChange={onTabChange}
					>
						{renderTab()}
					</Card>
				</Content>
			</Layout>
		</>
	);
};
