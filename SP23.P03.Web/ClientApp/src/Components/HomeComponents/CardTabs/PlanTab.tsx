import { ConfigProvider, Steps } from "antd";
import { TripInputForm } from "../TripForm/TripInputForm";
import { BookResults } from "../BookResults/BookResults";

import "./PlanTabStyle.css";
import { useState } from "react";
import { HomePageMap } from "../../GoogleMaps/HomePageMap";
import { AzureMapDisplay } from "../../GoogleMaps/AzureDisplayMap";

interface TicketRequestData {
	ticketType: string;
	from: string;
	to: string;
	passengers: number;
	depart: string;
	return: string;
}

export const PlanTab = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [ticketData, setTicketData] = useState<TicketRequestData>(
		null as any
	);
	return (
		<>
			<ConfigProvider
				theme={{
					components: {
						Steps: {
							colorPrimary: "rgb(253,186,116)",
						},
						Switch: {
							colorPrimary: "rgb(253,186,116)",
						},
					},
				}}
			>
				<div className="timeline-card-header">
					<Steps
						className="steps"
						current={currentStep}
						items={[
							{
								title: "Plan",
							},
							{
								title: "Book",
							},
							{
								title: "Complete",
							},
						]}
					/>
				</div>
				{currentStep === 0 && (
					<TripInputForm
						setTicketData={setTicketData}
						setCurrentStep={setCurrentStep}
					/>
				)}
				{currentStep === 1 && (
					<>
						<AzureMapDisplay />
						<BookResults
							ticketData={ticketData}
							setCurrentStep={setCurrentStep}
						/>
					</>
				)}
			</ConfigProvider>
		</>
	);
};
