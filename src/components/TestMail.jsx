"use client";
import { sendMail } from "../../sendMail";
import { useState } from "react";

export default function TestMail() {
	const [email, setEmail] = useState("");

	const content = {
		to: email,
		subject: "Order confirmation",
		html: {
			name: "Jacob",
			numRegular: "2",
			numVip: "1",
			campArea: "Helheim",
			numTwoTent: "1",
			numThreeTent: "0",
			greenCamping: "Yes",
			totalPrice: "3544",
		},
		company: "FooFest - Festival",
		sendername: "FooFest Customer Support / support@foofest.com",
		template: "foofest-template",
	};

	return (
		<>
			<input
				type="email"
				placeholder="Type here"
				className="input input-bordered w-full max-w-xs"
				value={email}
				onChange={(e) => {
					setEmail(e.target.value);
				}}
				required
			/>
			<button
				className="btn"
				onClick={() => {
					console.log(content);
					sendMail(content);
					setEmail("");
				}}
			>
				Send Mail
			</button>
		</>
	);
}
