import { theme, List, Card, Row, Col, Button } from "antd";
import { Header } from "antd/es/layout/layout";
import { useState } from "react";
import { TbArrowNarrowRight } from "react-icons/tb";

export const OneWayTicket = () => {
	const [isClicked, setIsClicked] = useState(false);

	const toStation = sessionStorage.getItem("to-city")!;
	const fromStation = sessionStorage.getItem("from-city")!;

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const cardStyle: React.CSSProperties = {
		width: "100%",
	};
	const buttonStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		height: "14vh",

		background: isClicked ? "rgb(253,186,116)" : "initial",
	};

	return (
		<>
			<List.Item>
				<Card style={cardStyle} bordered={false}>
					<Row justify="space-between" align="middle">
						<Col xs={24} md={8}>
							<Card
								style={{
									borderColor: "#333333",
									textAlign: "center",
									width: "25vh",
								}}
							>
								<Header
									style={{
										background: colorBgContainer,
										textAlign: "center",
										fontWeight: "bold",
									}}
								>
									{" "}
									Depart
								</Header>
								<p>{fromStation} at 5:30 AM</p>
							</Card>
						</Col>
						<Col
							xs={24}
							md={3}
							style={{
								display: "flex",
								strokeWidth: 3000,
								justifyContent: "left",
								alignContent: "baseline",
							}}
						>
							<TbArrowNarrowRight
								style={{
									fontSize: "60px",
								}}
							/>
						</Col>
						<Col xs={24} md={7}>
							<Card
								style={{
									borderColor: "#333333",
									textAlign: "center",
									width: "25vh",
								}}
							>
								<Header
									style={{
										background: colorBgContainer,
										textAlign: "center",
										fontWeight: "bold",
									}}
								>
									{" "}
									Arrive
								</Header>
								<p>{toStation} at 5:30 AM</p>
							</Card>
						</Col>
						<Col
							// span={5}
							// style={{ marginLeft: "5vh" }}
							xs={24}
							md={6}
						>
							<Button
								className="ticket-button"
								style={buttonStyle}
								onClick={() => {
									setIsClicked(!isClicked);
								}}
							>
								<div className="ticket-info">
									<p>$100</p>
									<p className="row-avail">
										Tickets Available
									</p>

									<p
										style={{
											fontStyle: "italic",
											fontSize: 16,
										}}
									>
										Click to select
									</p>
								</div>
							</Button>
						</Col>
					</Row>
				</Card>
			</List.Item>
		</>
	);
};
