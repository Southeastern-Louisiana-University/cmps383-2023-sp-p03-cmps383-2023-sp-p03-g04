import { theme, Layout, Row, Col, Input, Button } from "antd";
import { Header, Content } from "antd/es/layout/layout";

export const StatusTab = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<>
			<Layout>
				<Header
					style={{
						background: colorBgContainer,
						textAlign: "center",
						fontSize: "25px",
					}}
				>
					Enter the Ticket ID you received in your order confirmation
					email to view your train's status
				</Header>
				<Content
					style={{
						background: colorBgContainer,
						textAlign: "center",
						fontSize: "20px",
					}}
				>
					<Row
						style={{
							textAlign: "center",
							fontSize: "20px",
							justifyContent: "center",
						}}
					>
						<Col span={6}>
							<Input name="ticket-id" />
						</Col>
					</Row>
					<Row
						style={{
							textAlign: "center",
							fontSize: "20px",
							justifyContent: "center",
							marginTop: "16px",
						}}
					>
						<Col span={3}>
							<Button type="primary"> Search </Button>
						</Col>
					</Row>
				</Content>
			</Layout>
		</>
	);
};
