import { AutoComplete, Button, Form, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../Authentication/AuthContext";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { getAddress, getAddressDetails } from "../../Data/GoogleMaps/PlacesApi";

import "./RegistrationFormStyle.css";

export const RegistrationForm = () => {
	const auth = useAuth();
	const [api, contextHolder] = notification.useNotification();
	const [hasError, setHasError] = useState(undefined as any);
	const [status, setStatus] = useState(undefined as any);
	const [isLoading, setIsLoading] = useState(false);
	const [addressQuery, setAddressQuery] = useState("");
	const [addressPredictions, setAddressPredictions] = useState(
		[] as any[] | undefined
	);
	const [address, setAddressValue] = useState("");

	useEffect(() => {
		const setAddress = async () => {
			const predictions = await getAddress(addressQuery);
			const details = await Promise.all(
				predictions!.map(async (prediction) => {
					const detailsResponse = await getAddressDetails(
						prediction.Id
					);

					return detailsResponse;
				})
			);
			setAddressPredictions(details);
		};

		setAddress();
	}, [addressQuery, address]);

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
		// eslint-disable-next-line no-template-curly-in-string
		required: "${label} is required",
	};
	const options = addressPredictions!.map((option) => {
		return {
			label: option,
			value: option,
		};
	});

	type Registration = {
		username: string;
		password: string;
		firstname: string;
		lastname: string;
		address: string;
		email: string;
		roles: Array<string>;
	};

	const tryRegister = async (values) => {
		setIsLoading(true);
		setStatus("validating");
		const inputData: Registration = {
			username: values.username,
			password: values.password,
			firstname: values.firstname,
			lastname: values.lastname,
			address: values.address,
			email: values.email,
			roles: ["User"],
		};
		try {
			setTimeout(async () => {
				await auth.register(inputData);
				setIsLoading(false);
				openNotification();
				setStatus("");
				Modal.destroyAll();
			}, 500);
		} catch (err) {
			setHasError("error");
			setIsLoading(false);
			openNotification();
		}
	};
	return (
		<div className="container">
			<Form
				validateMessages={validateMessages}
				onFinish={tryRegister}
				className="form-container"
			>
				{contextHolder}

				<Form.Item
					label={<span className="form-label">First Name</span>}
					name="firstname"
					rules={[
						{
							required: true,
						},
					]}
					validateStatus={hasError}
					status={status}
					labelCol={{ span: 3 }}
					wrapperCol={{ span: 18 }}
				>
					<Input className="form-input" prefix={<UserOutlined />} />
				</Form.Item>

				<Form.Item
					label={<span className="form-label">Last Name</span>}
					name="lastname"
					rules={[
						{
							required: true,
						},
					]}
					validateStatus={hasError}
					status={status}
					labelCol={{ span: 3 }}
					wrapperCol={{ span: 18 }}
				>
					<Input className="form-input" prefix={<UserOutlined />} />
				</Form.Item>

				<Form.Item
					label={<span className="form-label">Address</span>}
					name="address"
					rules={[
						{
							required: true,
						},
					]}
					validateStatus={hasError}
					status={status}
					labelCol={{ span: 3 }}
					wrapperCol={{ span: 18 }}
				>
					<AutoComplete
						onSelect={(e) => setAddressValue(e)}
						value={address}
						onSearch={(text) => setAddressQuery(text)}
					>
						{options.map((option) => {
							return (
								<AutoComplete.Option value={option.value}>
									{option.label}
								</AutoComplete.Option>
							);
						})}
					</AutoComplete>
				</Form.Item>
				<Form.Item
					label={<span className="form-label">Email</span>}
					name="email"
					rules={[
						{
							required: true,
						},
					]}
					validateStatus={hasError}
					status={status}
					labelCol={{ span: 3 }}
					wrapperCol={{ span: 18 }}
				>
					<Input className="form-input" prefix={<MailOutlined />} />
				</Form.Item>
				<Form.Item
					label={<span className="form-label">Username</span>}
					name="username"
					rules={[
						{
							required: true,
						},
					]}
					validateStatus={hasError}
					status={status}
					labelCol={{ span: 3 }}
					wrapperCol={{ span: 18 }}
				>
					<Input className="form-input" prefix={<UserOutlined />} />
				</Form.Item>
				<Form.Item
					label={<span className="form-label">Password</span>}
					name="password"
					rules={[
						{
							required: true,
						},
					]}
					validateStatus={hasError}
					status={status}
					labelCol={{ span: 3 }}
					wrapperCol={{ span: 18 }}
				>
					<Input
						className="form-input"
						type="password"
						prefix={<LockOutlined />}
					/>
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 20 }}>
					<Button
						type="primary"
						htmlType="submit"
						loading={isLoading}
						style={{
							display: "flex",
							placeContent: "baseline center",
							height: "100%",
							width: "50%",
							fontSize: 20,
						}}
					>
						Register
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
