import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./Authentication/AuthContext";

const domNode = document.getElementById("root")!;
const root = ReactDOM.createRoot(domNode);
root.render(
	<AuthProvider>
		<App />
	</AuthProvider>
);
