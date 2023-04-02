import { Button, Divider, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import "./BookResults.css";
import { TicketListItem } from "./TicketListItem";

interface BookingProps {
	onSubmit: () => void;
	setCurrentStep: (step: number) => void;
}

export const BookResults = (props: BookingProps) => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const back = () => {
		props.setCurrentStep(0);
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
			<TicketListItem setCurrentStep={props.setCurrentStep} />
		</>
	);
};
