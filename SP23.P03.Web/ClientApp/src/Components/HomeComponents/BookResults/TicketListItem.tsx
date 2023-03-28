import { Divider, theme } from "antd";
import { OneWayTicket } from "./TicketListItems/OneWayTicket";
import { RoundTripTicket } from "./TicketListItems/RoundTripTicket";
import { Header } from "antd/es/layout/layout";

interface BookingProps {
	onSubmit: () => void;
	setCurrentStep: (step: number) => void;
}

export const TicketListItem = () => {
	const ticketType = sessionStorage.getItem("ticket-type")!;
	return (
		<>{ticketType === "One Way" ? <OneWayTicket /> : <RoundTripTicket />}</>
	);
};
