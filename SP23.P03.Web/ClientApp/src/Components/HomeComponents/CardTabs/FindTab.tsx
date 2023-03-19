import { Button, Col, Input, Layout, Row, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";

export const FindTab = () => {
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
					email
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
