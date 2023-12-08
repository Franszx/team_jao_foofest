"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
	"https://urhncfuwsqbvnyotdqmh.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyaG5jZnV3c3Fidm55b3RkcW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5ODAzOTIsImV4cCI6MjAxNzU1NjM5Mn0.p3JncVVNOfKr1dMrWFcYxXKxHesdYaRlwIwZs7hqd_Y"
);

function Page() {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const deviceID = uuidv4();
	console.log(deviceID);

	const handleInserts = (payload) => {
		setMessages((messages) => [...messages, payload.new]);
	};

	const handleNewMessageChange = (event) => {
		setNewMessage(event.target.value);
	};

	const handleNewMessage = async (event) => {
		event.preventDefault();
		console.log(newMessage);
		const { data, error } = await supabase
			.from("midgard")
			.insert([{ message: newMessage, sender: deviceID }]);
		if (error) {
			console.error("Error inserting:", error);
		} else {
			setNewMessage("");
		}
	};

	useEffect(() => {
		const fetchMessages = async () => {
			const { data, error } = await supabase.from("midgard").select("*");
			if (error) {
				console.error("Error fetching messages:", error);
			} else {
				setMessages(data);
			}
		};

		fetchMessages();

		const subscription = supabase
			.channel("todos")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "midgard" },
				handleInserts
			)
			.subscribe();

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	// Rest of your component
	return (
		<div>
			<h1>Chat</h1>
			<form onSubmit={handleNewMessage}>
				<input
					type="text"
					className="bg-gray-900"
					value={newMessage}
					onChange={handleNewMessageChange}
				/>
				<button type="submit">Send</button>
			</form>
			<div className="chat chat-end">
				{messages.map((message, index) => (
					<div
						key={index}
						className={
							message.sender === deviceID
								? "chat-bubble mt-4 chat-bubble-primary"
								: "chat-bubble mt-4 chat-bubble-secondary"
						}
					>
						{message.message}
					</div>
				))}
			</div>
		</div>
	);
}

export default Page;
