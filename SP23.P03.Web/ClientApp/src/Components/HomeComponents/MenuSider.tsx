import { Menu, MenuProps, Modal } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import {
	BookOutlined,
	HomeOutlined,
	SettingOutlined,
	UserDeleteOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../Authentication/AuthContext";
import { User } from "../../Data/Types/UserTypes";
import { LoginForm } from "../AuthForms/LoginForm";
import { RiTicketLine } from "react-icons/ri";
import { redirect } from "react-router";
import { RegistrationForm } from "../AuthForms/RegistrationForm";

import "./MenuSider.css";

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
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
	const [current, setCurrent] = useState("home");
	const [user, setUser] = useState<User | null>();
	const auth = useAuth();

	useEffect(() => {
		setIsLoginModalOpen(false);
		setUser(auth.user);

		if (user !== null || user !== undefined) {
			setIsLoginModalOpen(false);
		}
	}, [auth.user, user]);

	const MenuItems = () => {
		if (user === null || user === undefined) {
			return [
				getItem("Home", "home", <HomeOutlined />),
				getItem("Account", "account", <UserOutlined />, [
					getItem("Login", "login"),
					getItem("Sign-Up", "signup"),
				]),
			];
		} else {
			return [
				getItem("Home", "home", <HomeOutlined />),
				getItem("Account", "account", <UserOutlined />, [
					getItem("Logout", "logout", <UserDeleteOutlined />),
					getItem("My Account", "my-account", <SettingOutlined />),
					getItem("My Tickets", "my-tickets", <RiTicketLine />),

					getItem(
						"Ticket History",
						"ticket-history",
						<BookOutlined />
					),
				]),
			];
		}
	};
	const handleModalCancel = () => {};
	const onClick: MenuProps["onClick"] = (e) => {
		if (e.key === "login") {
			showLoginModal();
		}
		if (e.key === "signup") {
			showRegisterModal();
		}
		if (e.key === "logout") {
			Modal.confirm({
				title: "Logout",
				content: "Are you sure you want to logout?",
				okText: "Yes",
				cancelText: "No",
				onOk: () => {
					auth.logout();
					setCurrent("home");
				},
				onCancel: handleModalCancel,
			});
		} else {
			setCurrent(e.key);
			redirect(`/${e.key}`);
		}
	};
	const handleOk = () => {
		setIsLoginModalOpen(false);
	};

	const showLoginModal = () => {
		setIsLoginModalOpen(true);
	};
	const showRegisterModal = () => {
		setIsRegisterModalOpen(true);
	};

	const handleCancel = () => {
		setIsLoginModalOpen(false);
		setIsRegisterModalOpen(false);
	};

	const siderStyle: React.CSSProperties = {
		backgroundColor: "#fdba74",
		position: "sticky",
		top: 0,
		zIndex: 100,
	};
	const menuStyle: React.CSSProperties = {
		backgroundColor: "#fdba74",
		position: "sticky",
		top: "5vh",
		zIndex: 4,
	};

	return (
		<>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
				style={siderStyle}
			>
				<div
					style={{
						position: "sticky",
						top: 0,
						bottom: 12,
						zIndex: 4,
						height: 64,
						margin: 0,
						backgroundColor: "#3223d3",
						color: "white",
						display: "flex",
						fontWeight: "bold",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<h1
						style={{
							color: "white",
							justifyContent: "center",
							height: 15,
						}}
					>
						{collapsed ? "ET" : "EnTrack"}
					</h1>
				</div>
				<Menu
					style={menuStyle}
					defaultSelectedKeys={["home"]}
					defaultOpenKeys={["account"]}
					selectedKeys={[current]}
					mode="inline"
					items={MenuItems()}
					onClick={onClick}
					rootClassName="menu-sider"
				/>
				<Modal
					title="Login"
					closable={false}
					centered
					onOk={handleOk}
					onCancel={handleCancel}
					open={isLoginModalOpen}
					footer={null}
					wrapClassName="custom-modal-style"
				>
					<LoginForm />
				</Modal>
				<Modal
					title="Registration"
					closable
					centered
					onOk={handleOk}
					onCancel={handleCancel}
					open={isRegisterModalOpen}
					footer={null}
					width="50vw"
					wrapClassName="custom-modal-style"
				>
					<RegistrationForm />
				</Modal>
			</Sider>
		</>
	);
};
