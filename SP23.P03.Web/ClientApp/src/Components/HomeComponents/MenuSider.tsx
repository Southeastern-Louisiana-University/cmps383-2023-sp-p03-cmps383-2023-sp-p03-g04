import { Layout, Menu, MenuProps, Modal, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Header, Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { HomeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../Authentication/AuthContext";
import { User } from "../../Data/Types/UserTypes";
import { LoginForm } from "../Login/LoginForm";
import { RiTicketLine } from "react-icons/ri";
import { Navigate, redirect } from "react-router";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key: React.ReactNode,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

export const MenuSider = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [current, setCurrent] = useState("home");
	const [user, setUser] = useState<User | null>();
	const auth = useAuth();

	useEffect(() => {
		setIsModalOpen(false);
		setUser(auth.user);

		if (user !== null || user !== undefined) {
			setIsModalOpen(false);
		}
	}, [auth.user, user]);

	const MenuItems = () => {
		console.log(auth);
		if (user === null || user === undefined) {
			return [
				getItem("Home", "home", <HomeOutlined />),
				getItem("User", "sub1", <UserOutlined />, [
					getItem("Login", "login"),
					getItem("Sign-Up", "signup"),
				]),
			];
		} else {
			return [
				getItem("Home", "home"),
				getItem("User", "sub1", <UserOutlined />, [
					getItem("Account", "account", <SettingOutlined />),
					getItem("My Tickets", "my-tickets", <RiTicketLine />),
				]),
				getItem("Trip Planner", "trip-planner"),
			];
		}
	};

	const onClick: MenuProps["onClick"] = (e) => {
		if (e.key === "login") {
			showModal();
		}
		if (e.key === "home") {
			setCurrent("home");
			redirect("/");
		}
		if (e.key === "account") {
			setCurrent("account");
			redirect("/account");
		}
	};
	const handleOk = () => {
		console.log("ok");
		console.log(isModalOpen);
		setIsModalOpen(false);
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		console.log("cancel");
		console.log(isModalOpen);
		setIsModalOpen(false);
	};

	return (
		<>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<div
					style={{
						height: 32,
						margin: 16,
						// background: "rgba(255, 255, 255, 0.2)",
						color: "white",
						fontWeight: "bold",
						textAlign: "center",
					}}
				>
					<h1>{collapsed ? "ET" : "EnTrack"}</h1>
				</div>
				<Menu
					theme="dark"
					defaultSelectedKeys={["home"]}
					defaultOpenKeys={["sub1"]}
					selectedKeys={[current]}
					mode="inline"
					items={MenuItems()}
					onClick={onClick}
				/>
				<Modal
					title="Login"
					closable
					centered
					onOk={handleOk}
					onCancel={handleCancel}
					open={isModalOpen}
					footer={null}
				>
					<LoginForm />
				</Modal>
			</Sider>
		</>
	);
};
