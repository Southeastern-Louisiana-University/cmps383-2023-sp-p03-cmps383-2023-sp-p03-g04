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
} from "antd";
import { useEffect, useState } from "react";
import {
	getAddressCityCountry,
	getAddressDetails,
} from "../../../Data/GoogleMaps/PlacesApi";

import "./TripInputStyle.css";
import dayjs from "dayjs";

interface FormProps {
	onSubmit: (data) => void;
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
	const [addressTo, setAddressToValue] = useState("");
	const [addressFromQuery, setAddressFromQuery] = useState("");
	const [addressFromPredictions, setAddressFromPredictions] = useState(
		[] as any[]
	);
	const [addressFrom, setAddressFromValue] = useState("");
	const [radioValue, setRadioValue] = useState("");
	const [radioLoading, setRadioLoading] = useState(false);

	const [selectedToDate, setSelectedToDate] = useState<string | null>(
		sessionStorage.getItem("selected-to-date")
	);
	const [selectedFromDate, setSelectedFromDate] = useState<string | null>(
		sessionStorage.getItem("selected-from-date")
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
			const predictions = await getAddressCityCountry(addressToQuery);

			if (predictions !== undefined) {
				setAddressToPredictions(predictions);
			}
		};

		setToAddress();
		const setFromAddress = async () => {
			const predictions = await getAddressCityCountry(addressFromQuery);

			if (predictions !== undefined) {
				setAddressFromPredictions(predictions);
			}
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
	}, [addressToQuery, addressTo, addressFromQuery, addressFrom]);

	const onSelectTo = async (data) => {
		data = addressToPredictions!.filter(
			(pred) => pred.description === data
		);
		const details = await getAddressDetails(data[0].Id);
		setAddressToValue(details as string);
		window.sessionStorage.setItem("to-city", details as string);
	};
	const onSelectFrom = async (data) => {
		data = addressFromPredictions!.filter(
			(pred) => pred.description === data
		);
		const details = await getAddressDetails(data[0].Id);
		setAddressFromValue(details as string);
		window.sessionStorage.setItem("from-city", details as string);
	};

	const data: TicketRequestData = {
		from: selectedToDate!,
		to: selectedFromDate!,
		passengers: parseInt(sessionStorage.getItem("passengers")!),
		ticketType: sessionStorage.getItem("ticket-type")!,
		return: sessionStorage.getItem("to-city")!,
		depart: sessionStorage.getItem("from-cty")!,
	};

	const onSubmit = () => {
		props.setCurrentStep(1);
		props.onSubmit(data);
	};

	const toOptions = addressToPredictions.map((option) => {
		return {
			label: option.description,
			value: option.description,
		};
	});
	const fromOptions = addressFromPredictions.map((option) => {
		return {
			label: option.description,
			value: option.description,
		};
	});

	const onRadioChange = (e) => {
		sessionStorage.setItem("ticket-type", e.target.value);
		setRadioValue(e.target.value);
	};

	const onToDateChange = (date: any, dateString: string) => {
		setSelectedToDate(dateString);
		sessionStorage.setItem("selected-to-date", dateString);
	};

	const onFromDateChange = (date: any, dateString: string) => {
		setSelectedFromDate(dateString);
		sessionStorage.setItem("selected-from-date", dateString);
	};
	const defaultToDate = sessionStorage.getItem("selected-to-date")
		? dayjs(sessionStorage.getItem("selected-to-date"))
		: (null as unknown as dayjs.Dayjs);
	const defaultFromDate = sessionStorage.getItem("selected-from-date")
		? dayjs(sessionStorage.getItem("selected-from-date"))
		: (null as unknown as dayjs.Dayjs);
	const defaultTicketType =
		sessionStorage.getItem("ticket-type") || "round-trip";
	const defaultPassengers = parseInt(sessionStorage.getItem("passengers")!);
	const defaultFromCity = sessionStorage.getItem("from-city");
	const defaultToCity = sessionStorage.getItem("to-city");

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
					<Radio.Button value="One Way">One-Way</Radio.Button>
					<Radio.Button value="Round Trip">Round-Trip</Radio.Button>
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
							size="large"
							options={fromOptions}
							onSelect={onSelectFrom}
							onSearch={(text) => setAddressFromQuery(text)}
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
							size="large"
							options={toOptions}
							onSelect={onSelectTo}
							onSearch={(text) => setAddressToQuery(text)}
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
								sessionStorage.setItem(
									"passengers",
									event!.toString()
								);
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
