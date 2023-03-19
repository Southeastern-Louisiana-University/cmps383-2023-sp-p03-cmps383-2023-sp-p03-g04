import { Button, Card, Col, Layout, List, Row, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ArrowRightOutlined } from "@ant-design/icons";

import "./BookResults.css";
import { useState } from "react";

interface BookingProps {
	onSubmit: () => void;
	setCurrentStep: (step: number) => void;
}

export const BookResults = (props: BookingProps) => {
	const [isClicked, setIsClicked] = useState(false);

	const toStation = sessionStorage.getItem("to-city")!;
	const fromStation = sessionStorage.getItem("from-city")!;

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const back = () => {
		props.setCurrentStep(0);
	};
	const cardStyle: React.CSSProperties = {
		width: "200vh",
	};
	const buttonStyle = isClicked ? { background: "rgb(253,186,116)" } : {};
	return (
		<>
			<Layout>
				<Header style={{ background: colorBgContainer }}>
					<Button onClick={back}>Back</Button>
				</Header>
				<Content>
					<div className="list-wrapper">
						<List>
							<List.Item>
								<Card style={cardStyle} bordered={false}>
									<Row>
										<Col>
											<Card
												style={{
													borderColor: "#333333",
												}}
											>
												<Header
													style={{
														background:
															colorBgContainer,
														textAlign: "center",
														fontWeight: "bold",
													}}
												>
													{" "}
													Depart
												</Header>
												{fromStation} at 5:30 AM
											</Card>
										</Col>
										<Col span={1}>
											<ArrowRightOutlined
												style={{
													fontSize: "30px",
													alignContent: "center",
													justifyContent: "center",
													marginTop: "5vh",
													marginLeft: "2vh",
												}}
											/>
										</Col>
										<Col>
											<Card
												style={{
													borderColor: "#333333",
												}}
											>
												<Header
													style={{
														background:
															colorBgContainer,
														textAlign: "center",
														fontWeight: "bold",
													}}
												>
													{" "}
													Arrive
												</Header>
												{toStation} at 5:30 AM
											</Card>
										</Col>
										<Col
											span={5}
											style={{ marginLeft: "5vh" }}
										>
											<Button
												className="ticket-button"
												style={buttonStyle}
												onClick={() => {
													setIsClicked(!isClicked);
												}}
											>
												<Row className="row">
													{sessionStorage.getItem(
														"ticket-type"
													)}
												</Row>
												<Row className="row">$100</Row>
												<Row className="row row-avail">
													Tickets Available
												</Row>
											</Button>
										</Col>
									</Row>
								</Card>
							</List.Item>
						</List>
					</div>
				</Content>
			</Layout>
		</>
	);
};
