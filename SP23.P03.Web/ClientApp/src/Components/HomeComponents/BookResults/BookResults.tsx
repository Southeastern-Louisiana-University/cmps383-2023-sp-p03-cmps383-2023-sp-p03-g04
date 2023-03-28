import { Button, Card, Col, Divider, Layout, List, Row, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ArrowRightOutlined } from "@ant-design/icons";
import { TbArrowNarrowRight } from "react-icons/tb";
import "./BookResults.css";
import { useState } from "react";
import { TicketListItem } from "./TicketListItem";

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
		width: "100%",
	};
	const buttonStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		background: "blue",
		color: "white",
		width: "10%",
		marginTop: 10,
		alignItems: "center",
	};

	return (
		<>
			<Header style={{ background: colorBgContainer, padding: 0 }}>
				<Button style={buttonStyle} onClick={back}>
					Back
				</Button>
				<h1 style={{ fontSize: 20, textAlign: "center" }}>
					Select your ticket
				</h1>
			</Header>
			<Divider style={{ border: "1px solid black" }} />
			<TicketListItem />
		</>
	);
};
