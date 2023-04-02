import React from "react";
import { OneWayTicket } from "./TicketListItems/OneWayTicket";
import { RoundTripTicket } from "./TicketListItems/RoundTripTicket";

interface Props {
	setCurrentStep: (step: number) => void;
}

export const TicketListItem = (props: Props) => {
	const ticketType = sessionStorage.getItem("ticket-type")!;
	return (
		<>
			{ticketType === "One Way" ? (
				<OneWayTicket setCurrentStep={props.setCurrentStep} />
			) : (
				<RoundTripTicket setCurrentStep={props.setCurrentStep} />
			)}
		</>
	);
};
