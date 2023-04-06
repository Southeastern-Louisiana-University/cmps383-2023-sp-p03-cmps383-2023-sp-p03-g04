import React from "react";
import { OneWayTicket } from "./TicketListItems/OneWayTicket";
import { RoundTripTicket } from "./TicketListItems/RoundTripTicket";

interface TicketRequestData {
	ticketType: string;
	from: string;
	to: string;
	passengers: number;
	depart: string;
	return: string;
}
interface Props {
	setCurrentStep: (step: number) => void;
	ticketData: TicketRequestData;
}

export const TicketListItem = (props: Props) => {
	const ticketType = props.ticketData.ticketType;
	console.log(ticketType);
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
