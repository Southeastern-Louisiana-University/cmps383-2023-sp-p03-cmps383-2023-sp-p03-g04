/* eslint-disable no-template-curly-in-string */
import { Button, Form, Input, Modal, notification } from "antd";
import React, { useState } from "react";
import { useAuth } from "../../Authentication/AuthContext";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export const LoginForm = () => {
	const auth = useAuth();
	const [api, contextHolder] = notification.useNotification();
	const [hasError, setHasError] = useState(undefined as any);
	const [status, setStatus] = useState(undefined as any);
	const [isLoading, setIsLoading] = useState(false);

	notification.config({
		placement: "top",
		duration: 2,
		maxCount: 1,
	});

	const openNotification = () => {
		api.destroy();
		if (hasError === "error") {
			api.open({
				message: "Login Failed",
				description: "Invalid username or password!",
				duration: 2,
				placement: "top",
				type: "error",
			});
		} else {
			api.open({
				message: "Login Success",
				duration: 2,
				placement: "top",
				type: "success",
			});
		}
	};

	const validateMessages = {
		required: "${label} is required",
	};
	const tryLogin = async (values) => {
		setIsLoading(true);
		setStatus("validating");
		try {
			setTimeout(async () => {
				await auth.login(values.username, values.password);
				setIsLoading(false);
				openNotification();
				setStatus("");
			}, 500);
		} catch {
			setHasError("error");
			setIsLoading(false);
			setStatus("error");
			openNotification();
		}
		Modal.destroyAll();
	};
	return (
		<Form validateMessages={validateMessages} onFinish={tryLogin}>
			{contextHolder}
			<Form.Item
				label="Username"
				name="username"
				rules={[
					{
						required: true,
					},
				]}
				validateStatus={hasError}
				status={status}
			>
				<Input prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item
				label="Password"
				name="password"
				rules={[
					{
						required: true,
					},
				]}
				validateStatus={hasError}
				status={status}
			>
				<Input.Password prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item wrapperCol={{ offset: 12, span: 16 }}>
				<Button type="primary" htmlType="submit" loading={isLoading}>
					Login
				</Button>
			</Form.Item>
		</Form>
	);
};
