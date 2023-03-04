import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./Authentication/AuthContext";
import { BrowserRouter } from "react-router-dom";

const domNode = document.getElementById("root")!;
const root = ReactDOM.createRoot(domNode);
root.render(
	<AuthProvider>
		<App />
	</AuthProvider>
);
