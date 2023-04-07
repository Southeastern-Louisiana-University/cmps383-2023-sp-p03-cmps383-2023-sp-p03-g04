import {
	Form,
	Radio,
	Row,
	AutoComplete,
	InputNumber,
	DatePicker,
	Col,
	Button,
	Spin,
	Select,
} from "antd";
import { useEffect, useState } from "react";
import "./TripInputStyle.css";
import dayjs from "dayjs";
import { getCity, reverseLocate } from "../../../Data/AzureMaps/AzureMapApi";
import { getCookie, setCookie } from "../../../Data/Cookies/CookieData";

interface FormProps {
	setTicketData: (data) => void;
	setCurrentStep: (step: number) => void;
}

interface TicketRequestData {
	ticketType: string;
	from: string;
	to: string;
	passengers: number;
	depart: string;
	return: string;
}

export const TripInputForm = (props: FormProps) => {
	const [addressToQuery, setAddressToQuery] = useState("");
	const [addressToPredictions, setAddressToPredictions] = useState(
		[] as any[]
	);
	const [addressToValue, setAddressToValue] = useState<string>(
		getCookie("to-city") ?? ""
	);
	const [addressFromQuery, setAddressFromQuery] = useState("");
	const [addressFromPredictions, setAddressFromPredictions] = useState(
		[] as any[]
	);
	const [addressFromValue, setAddressFromValue] = useState<string>(
		getCookie("from-city") ?? ""
	);
	const [radioValue, setRadioValue] = useState(getCookie("ticket-type"));
	const [radioLoading, setRadioLoading] = useState(false);

	const [selectedToDate, setSelectedToDate] = useState<string | null>(
		getCookie("selected-to-date")
	);
	const [selectedFromDate, setSelectedFromDate] = useState<string | null>(
		getCookie("selected-from-date")
	);

	const inputStyle: React.CSSProperties = {
		width: "100%",
		border: "2px solid grey",
		borderRadius: 12,
		borderWidth: 3,
	};

	const radioStyle: React.CSSProperties = {
		border: "2px solid grey",
		borderRadius: 12,
		borderWidth: 3,
	};

	const submitButtonStlye: React.CSSProperties = {
		width: "30vh",
	};

	useEffect(() => {
		const setToAddress = async () => {
			setAddressToPredictions([]);
			setTimeout(async () => {
				const predictions = await getCity(addressToQuery);
				setAddressToPredictions(predictions);
			});
		};

		setToAddress();
		const setFromAddress = async () => {
			setAddressFromPredictions([]);
			setTimeout(async () => {
				const predictions = await getCity(addressFromQuery);
				setAddressFromPredictions(predictions);
			});
		};
		const setTicketType = () => {
			setRadioLoading(true);
			const type =
				window.sessionStorage.getItem("ticket-type") ?? "round-trip";
			setRadioValue(type);
			setRadioLoading(false);
		};
		setTicketType();
		setFromAddress();
	}, [addressToQuery, addressToValue, addressFromQuery, addressFromValue]);

	const onSelectTo = async (data: string) => {
		console.log(data);
		setCookie("to-lat", data.split(",")[1].trim(), 1);
		setCookie("to-lon", data.split(",")[0].trim(), 1);

		const val = await reverseLocate(data);
		setAddressToValue(val);
		console.log(val);
		setCookie("to-city", val, 1);
	};
	const onSelectFrom = async (data: string) => {
		setCookie("from-lat", data.split(",")[1].trim(), 1);
		setCookie("from-lon", data.split(",")[0].trim(), 1);
		const val = await reverseLocate(data);
		setAddressFromValue(val);
		setCookie("from-city", val, 1);
	};

	const data: TicketRequestData = {
		from: selectedToDate!,
		to: selectedFromDate!,
		passengers: parseInt(getCookie("passengers")!),
		ticketType: getCookie("ticket-type")!,
		return: getCookie("to-city")!,
		depart: getCookie("from-cty")!,
	};

	const onSubmit = () => {
		props.setCurrentStep(1);
		props.setTicketData(data);
	};

	const toOptions = addressToPredictions.map((option) => {
		return {
			label: option.address.freeformAddress,
			value: `${option.position.lat}, ${option.position.lon}`,
		};
	});
	const fromOptions = addressFromPredictions.map((option) => {
		return {
			label: option.address.freeformAddress,
			value: `${option.position.lat}, ${option.position.lon}`,
		};
	});
	const onRadioChange = (e) => {
		setCookie("ticket-type", e.target.value, 1);
		setRadioValue(e.target.value);
	};

	const onToDateChange = (date: any, dateString: string) => {
		setSelectedToDate(dateString);
		setCookie("selected-to-date", dateString, 1);
	};

	const onFromDateChange = (date: any, dateString: string) => {
		setSelectedFromDate(dateString);
		setCookie("selected-from-date", dateString, 1);
	};
	const defaultToDate =
		dayjs(getCookie("selected-to-date")) ||
		(null as unknown as dayjs.Dayjs);
	const defaultFromDate =
		dayjs(getCookie("selected-from-date")) ||
		(null as unknown as dayjs.Dayjs);
	const defaultTicketType = getCookie("ticket-type") || "round-trip";
	const defaultPassengers = parseInt(getCookie("passengers")!) || "";
	const defaultFromCity = getCookie("from-city") || "";
	const defaultToCity = getCookie("to-city") || "";

	const renderDatePickerLabel = () => {
		if (radioLoading === true) {
			return <Spin size="default" />;
		}

		if (radioValue === "Round Trip") {
			return (
				<Col span={6}>
					<label className="input-label">Return</label>
				</Col>
			);
		}
	};

	const renderDatePickerInput = () => {
		if (radioLoading === true) {
			return <Spin size="default" />;
		}
		if (radioValue === "Round Trip") {
			return (
				<Col span={6}>
					<Form.Item>
						<DatePicker
							className="trip-input"
							allowClear={false}
							name="date-to"
							style={inputStyle}
							size="large"
							defaultValue={defaultToDate}
							onChange={onToDateChange}
						/>
					</Form.Item>
				</Col>
			);
		}
	};

	function isOneWayChecked() {
		if (getCookie("ticket-type") === "One-Way") {
			return true;
		}
		return false;
	}
	function isRoundTripChecked() {
		if (getCookie("ticket-type") === "Round-Trip") {
			return true;
		}
		return false;
	}

	return (
		<Form onFinish={onSubmit} className="form-box">
			<Row>
				<label className="input-label">Ticket Type</label>
			</Row>
			<Form.Item name="ticket-type">
				<Radio.Group
					className="radio-group"
					buttonStyle="solid"
					size="large"
					style={radioStyle}
					defaultValue={defaultTicketType}
					onChange={onRadioChange}
				>
					<Radio.Button
						defaultChecked={isOneWayChecked()}
						value="One Way"
					>
						One-Way
					</Radio.Button>
					<Radio.Button
						defaultChecked={isRoundTripChecked()}
						value="Round Trip"
					>
						Round-Trip
					</Radio.Button>
				</Radio.Group>
			</Form.Item>
			<Row>
				<Col span={6}>
					<label className="input-label">From</label>
				</Col>
				<Col span={6}>
					<label className="input-label">To</label>
				</Col>
				<Col span={6}>
					<label className="input-label">Number of passengers</label>
				</Col>
			</Row>
			<Row align="middle">
				<Col span={6}>
					<Form.Item>
						<AutoComplete
							className="trip-input"
							placeholder="Enter City"
							allowClear
							style={inputStyle}
							value={addressFromValue}
							size="large"
							options={fromOptions}
							onSelect={onSelectFrom}
							onSearch={(text) => {
								setAddressFromValue(text);
								setAddressFromQuery(text);
							}}
							defaultValue={defaultFromCity}
						/>
					</Form.Item>
				</Col>

				<Col span={6}>
					<Form.Item>
						<AutoComplete
							className="trip-input"
							placeholder="Enter City"
							allowClear
							style={inputStyle}
							value={addressToValue}
							size="large"
							options={toOptions}
							onSelect={onSelectTo}
							onSearch={(text) => {
								setAddressToValue(text);
								setAddressToQuery(text);
							}}
							defaultValue={defaultToCity}
						/>
					</Form.Item>
				</Col>
				<Col span={6}>
					<Form.Item>
						<InputNumber
							className="trip-input"
							size="large"
							style={inputStyle}
							name="passenger-number"
							onChange={(event) => {
								setCookie("passengers", event!.toString(), 1);
							}}
							defaultValue={defaultPassengers}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={6}>
					<label className="input-label">Depart</label>
				</Col>
				{renderDatePickerLabel()}
			</Row>
			<Row>
				<Col span={6}>
					<Form.Item>
						<DatePicker
							className="trip-input"
							allowClear={false}
							onChange={onFromDateChange}
							style={inputStyle}
							size="large"
							name="date-from"
							defaultValue={defaultFromDate}
						/>
					</Form.Item>
				</Col>
				{renderDatePickerInput()}
				<Col span={6}>
					<Button
						type="primary"
						htmlType="submit"
						style={submitButtonStlye}
						size="large"
					>
						Submit
					</Button>
				</Col>
			</Row>
		</Form>
	);
};
