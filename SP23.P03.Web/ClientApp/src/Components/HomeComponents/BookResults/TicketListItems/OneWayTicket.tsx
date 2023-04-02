import { List, Descriptions } from "antd";
import React from "react";

import "./TicketStyle.css";

interface Props {
	setCurrentStep: (step: number) => void;
}

export const OneWayTicket = (props: Props) => {
	const dateOptions: any = {
		month: "2-digit",
		day: "2-digit",
		year: "numeric",
	};
	const fromDate = new Date(
		sessionStorage.getItem("selected-from-date")!
	).toLocaleDateString("en-US", dateOptions);
	console.log(fromDate);
	const toDate = new Date(
		sessionStorage.getItem("selected-to-date")!
	).toLocaleDateString("en-US", dateOptions);

	const labelStyle = {
		background: "darkgrey",
	};

	const back = () => {
		props.setCurrentStep(1);
	};

	const next = () => {
		props.setCurrentStep(2);
	};

	return (
		<>
			<List.Item>
				<button className="button-select">
					<Descriptions
						className="outer-view"
						bordered
						labelStyle={labelStyle}
					>
						<Descriptions.Item
							label={fromDate}
							labelStyle={{ fontWeight: "bold" }}
							span={12}
						>
							<div className="inner-items">
								<Descriptions
									className="inner-view"
									bordered
									labelStyle={labelStyle}
								>
									<Descriptions.Item label="Start">
										{sessionStorage.getItem("from-city")}
									</Descriptions.Item>
									<Descriptions.Item
										label="Destination"
										span={2}
									>
										{sessionStorage.getItem("to-city")}
									</Descriptions.Item>
									<Descriptions.Item label="Departure Time">
										5:30 AM
									</Descriptions.Item>
									<Descriptions.Item label="Arrival Time">
										5:30 AM
									</Descriptions.Item>
								</Descriptions>
							</div>
						</Descriptions.Item>
					</Descriptions>
				</button>
			</List.Item>
		</>
	);
};
