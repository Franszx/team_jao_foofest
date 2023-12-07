"use client";
import { sendMail } from "../../sendMail";

export default function TestMail() {
	const content = {
		to: "jacob23077643@gmail.com",
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
		company: "FooFest - Festical",
		sendername: "FooFest Customer Support",
		template: "foofest-template",
	};

	return (
		<button
			className="btn"
			onClick={() => {
				console.log("clicked");
				sendMail(content);
			}}
		>
			Send Mail
		</button>
	);
}
