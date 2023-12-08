"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { IconSend } from "@tabler/icons-react";

const supabase = createClient(
	"https://urhncfuwsqbvnyotdqmh.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyaG5jZnV3c3Fidm55b3RkcW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5ODAzOTIsImV4cCI6MjAxNzU1NjM5Mn0.p3JncVVNOfKr1dMrWFcYxXKxHesdYaRlwIwZs7hqd_Y"
);

let deviceID = localStorage.getItem("deviceID");

if (!deviceID) {
	deviceID = uuidv4();
	localStorage.setItem("deviceID", deviceID);
}

export default function LiveChat(props) {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");

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
			.from(props.tableName)
			.insert([{ message: newMessage, sender: deviceID }]);
		if (error) {
			console.error("Error inserting:", error);
		} else {
			setNewMessage("");
		}
	};

	useEffect(() => {
		const fetchMessages = async () => {
			const { data, error } = await supabase.from(props.tableName).select("*");
			if (error) {
				console.error("Error fetching messages:", error);
			} else {
				setMessages(data);
			}
		};

		fetchMessages();
	}, [props.tableName]);

	useEffect(() => {
		const subscription = supabase
			.channel("todos")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: props.tableName },
				handleInserts
			)
			.subscribe();

		return () => {
			subscription.unsubscribe();
		};
	}, [props.tableName]);

	return (
		<div className="w-96">
			<h1>Chat</h1>
			<div className="max-h-[500px] overflow-y-auto scrollbar-hide">
				{messages.map((message, index) => {
					if (message.sender === deviceID) {
						return (
							<div key={index} className="chat chat-end">
								<div className="chat-bubble mt-4 chat-bubble-primary">
									{message.message}
								</div>
							</div>
						);
					} else {
						return (
							<div key={index} className="chat chat-start">
								<div className="chat-bubble mt-4 chat-bubble-accent max-w-[300px] break-words">
									{message.message}
								</div>
							</div>
						);
					}
				})}
			</div>
			<form className="flex" onSubmit={handleNewMessage}>
				<input
					type="text"
					className="bg-gray-900"
					value={newMessage}
					onChange={handleNewMessageChange}
				/>
				<button type="submit">
					<IconSend color="#059669" />
				</button>
			</form>
		</div>
	);
}
