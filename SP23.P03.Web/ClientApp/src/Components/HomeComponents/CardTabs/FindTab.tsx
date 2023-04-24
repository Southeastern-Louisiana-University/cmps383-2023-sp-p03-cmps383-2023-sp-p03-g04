import { MailOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Layout, Row, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";

export const FindTab = () => {
	const [display, setDisplay] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const inputStyle: React.CSSProperties = {
		width: "100%",
		border: "2px solid grey",
		borderRadius: 12,
		borderWidth: 3,
	};

	const submitForm = () => {
		setDisplay(true);
	};

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
					Enter your Ticket ID and Email that the ticket information
					was sent to.
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
						<Form
							layout="horizontal"
							labelCol={{ span: 5 }}
							wrapperCol={{ span: 20 }}
						>
							<Form.Item label="Email">
								<Input
									style={inputStyle}
									prefix={<MailOutlined />}
								/>
							</Form.Item>
							<Form.Item label="Ticket Id">
								<Input
									style={inputStyle}
									prefix={<MailOutlined />}
								/>
							</Form.Item>
						</Form>
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
							<Button type="primary" onClick={submitForm}>
								{" "}
								Search{" "}
							</Button>
						</Col>
					</Row>
					<Row style={{ display: "flex", justifyContent: "center" }}>
						{display && (
							<>
								<Card>
									<p>
										<b>Your Ticket Info</b>
									</p>
									<p>
										<b>Route: </b> Dallas, TX to Austin, TX
									</p>
									<p>
										<b>Travel Date: </b> 05/15/2023
									</p>
									<p>
										<b>Departure Time: </b> 5:00 AM
									</p>
									<p>
										<b>Arrival Time: </b> 9:00 AM
									</p>
									<p>
										<b>Train Car:</b> Class B, First Class
									</p>
									<p>
										<b>Seat Number: </b> 12A
									</p>
								</Card>
							</>
						)}
					</Row>
				</Content>
			</Layout>
		</>
	);
};
