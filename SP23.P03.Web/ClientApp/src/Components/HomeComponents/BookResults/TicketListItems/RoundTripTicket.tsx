import { Button, Card, Col, List, Row, theme } from "antd";
import { useState } from "react";
import { TbArrowsRightLeft } from "react-icons/tb";

import "./RoundTripTicket.css";
export const RoundTripTicket = () => {
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
								<div className="card-body">
									<h1 className="dest-text">Depart</h1>
									<h1>{fromStation} at 5:30 AM</h1>
									<h1 className="dest-text">Arrive</h1>
									<h1>{toStation} at 11:00 AM</h1>
								</div>
							</Card>
						</Col>
						<Col xs={24} md={3} className="icon-style">
							<TbArrowsRightLeft />
						</Col>
						<Col xs={24} md={7}>
							<Card
								style={{
									borderColor: "#333333",
									textAlign: "center",
									width: "25vh",
								}}
							>
								<div className="card-body">
									<h1 className="dest-text">Depart</h1>
									<h1>{toStation} at 5:30 AM</h1>
									<h1 className="dest-text">Arrive</h1>
									<h1>{fromStation} at 11:00 AM</h1>
								</div>
							</Card>
						</Col>
						<Col xs={24} md={6}>
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
