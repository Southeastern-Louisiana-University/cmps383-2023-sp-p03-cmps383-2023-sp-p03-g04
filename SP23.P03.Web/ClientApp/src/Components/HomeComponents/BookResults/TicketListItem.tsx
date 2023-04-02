import { OneWayTicket } from "./TicketListItems/OneWayTicket";
import { RoundTripTicket } from "./TicketListItems/RoundTripTicket";

export const TicketListItem = () => {
	const ticketType = sessionStorage.getItem("ticket-type")!;
	return (
		<>{ticketType === "One Way" ? <OneWayTicket /> : <RoundTripTicket />}</>
	);
};
