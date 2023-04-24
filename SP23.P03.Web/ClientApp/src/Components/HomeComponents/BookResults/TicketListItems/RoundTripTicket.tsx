import { Descriptions, List } from "antd";

import "./RoundTripTicket.css";
import "./TicketStyle.css";
import { getCookie } from "../../../../Data/Cookies/CookieData";

interface Props {
	setCurrentStep: (step: number) => void;
}

export const RoundTripTicket = (props: Props) => {
	const dateOptions: any = {
		month: "2-digit",
		day: "2-digit",
		year: "numeric",
	};
	const fromDate = new Date(
		getCookie("selected-from-date")!
	).toLocaleDateString("en-US", dateOptions);
	const toDate = new Date(getCookie("selected-to-date")!).toLocaleDateString(
		"en-US",
		dateOptions
	);

	const labelStyle = {
		background: "darkgrey",
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
							label="Price"
							labelStyle={{ fontWeight: "bold" }}
							span={12}
							contentStyle={{
								fontWeight: "bold",
							}}
						>
							<p style={{ fontSize: "25px" }}>$100</p>
						</Descriptions.Item>
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
									<Descriptions.Item
										label="Start"
										className="desc-item"
									>
										{getCookie("from-city")}
									</Descriptions.Item>
									<Descriptions.Item
										label="Destination"
										span={2}
									>
										{getCookie("to-city")}
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
						<Descriptions.Item
							label={toDate}
							labelStyle={{ fontWeight: "bold" }}
							span={2}
						>
							<div className="inner-items">
								<Descriptions
									className="inner-view"
									bordered
									labelStyle={labelStyle}
								>
									<Descriptions.Item label="Start">
										{getCookie("to-city")}
									</Descriptions.Item>
									<Descriptions.Item
										label="Destination"
										span={2}
									>
										{getCookie("from-city")}
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
