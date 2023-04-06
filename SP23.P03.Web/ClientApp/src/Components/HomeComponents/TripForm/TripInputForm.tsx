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
	const [addressToValue, setAddressToValue] = useState("");
	const [addressFromQuery, setAddressFromQuery] = useState("");
	const [addressFromPredictions, setAddressFromPredictions] = useState(
		[] as any[]
	);
	const [addressFromValue, setAddressFromValue] = useState("");
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
		sessionStorage.setItem("to-lat", data.split(",")[1].trim());
		sessionStorage.setItem("to-lon", data.split(",")[1].trim());

		const val = await reverseLocate(data);
		setAddressToValue(val);
		window.sessionStorage.setItem("to-city", val as string);
	};
	const onSelectFrom = async (data: string) => {
		sessionStorage.setItem("from-lat", data.split(",")[0].trim());
		sessionStorage.setItem("from-lon", data.split(",")[1].trim());
		const val = await reverseLocate(data);
		setAddressFromValue(val);
		window.sessionStorage.setItem("from-city", val as string);
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
