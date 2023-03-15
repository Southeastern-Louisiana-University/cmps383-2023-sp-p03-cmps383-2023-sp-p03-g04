import { AutoComplete, Button, Form, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../Authentication/AuthContext";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { getAddress, getAddressDetails } from "../../Data/GoogleMapsApi";

export const RegistrationForm = () => {
	const auth = useAuth();
	const [api, contextHolder] = notification.useNotification();
	const [hasError, setHasError] = useState(undefined as any);
	const [status, setStatus] = useState(undefined as any);
	const [isLoading, setIsLoading] = useState(false);
	const [addressQuery, setAddressQuery] = useState("");
	const [addressPredictions, setAddressPredictions] = useState([] as any[]);
	const [address, setAddressValue] = useState("");

	useEffect(() => {
		const setAddress = async () => {
			const predictions = await getAddress(addressQuery);
			setAddressPredictions(predictions);
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
	const options = addressPredictions.map((option) => {
		return {
			label: option.description,
			value: option.description,
		};
	});

	const onSelect = async (data) => {
		data = addressPredictions.filter((pred) => pred.description === data);
		const details = await getAddressDetails(data[0].Id);
		setAddressValue(details as string);
	};

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
		<>
			<Form validateMessages={validateMessages} onFinish={tryRegister}>
				{contextHolder}
				<Form.Item
					label="First Name"
					name="firstname"
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
					label="Last Name"
					name="lastname"
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
					label="Address"
					name="address"
					rules={[
						{
							required: true,
						},
					]}
					validateStatus={hasError}
					status={status}
				>
					<AutoComplete
						options={options}
						onSelect={onSelect}
						onSearch={(text) => setAddressQuery(text)}
					/>
				</Form.Item>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
						},
					]}
					validateStatus={hasError}
					status={status}
				>
					<Input prefix={<MailOutlined />} />
				</Form.Item>
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
					<Input type="password" prefix={<LockOutlined />} />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 20 }}>
					<Button
						type="primary"
						htmlType="submit"
						loading={isLoading}
						style={{ width: "10vw" }}
					>
						Register
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};
