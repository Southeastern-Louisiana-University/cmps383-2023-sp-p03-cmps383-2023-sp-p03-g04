import { ConfigProvider, Steps } from "antd";
import { TripInputForm } from "../TripForm/TripInputForm";
import { useEffect, useState } from "react";
import { BookResults } from "../BookResults/BookResults";

import "./PlanTabStyle.css";

export const PlanTab = () => {
	const [currentStep, setCurrentStep] = useState(0);

	const onSubmitTrip = () => {};
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
						progressDot
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
						onSubmit={onSubmitTrip}
						setCurrentStep={setCurrentStep}
					/>
				)}
				{currentStep === 1 && (
					<BookResults
						onSubmit={onSubmitTrip}
						setCurrentStep={setCurrentStep}
					/>
				)}
			</ConfigProvider>
		</>
	);
};
