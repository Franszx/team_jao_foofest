"use client";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { IconSend } from "@tabler/icons-react";
import { supabase } from "@/utils/supabaseClient";

export default function LiveChat(props) {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [deviceID, setDeviceID] = useState(null);

	useEffect(() => {
		let id = localStorage.getItem("deviceID");
		if (!id) {
			id = uuidv4();
			localStorage.setItem("deviceID", id);
		}
		setDeviceID(id);
	}, []);

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
			.channel(`todos-${props.tableName}`)
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

	const chatEndRef = useRef(null);

	useEffect(() => {
		const chatContainer = chatEndRef.current?.parentNode;
		if (chatContainer) {
			chatContainer.scrollTo({
				top: chatContainer.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [messages]);

	const tableNameToClass = {
		midgard: "text-amber-500",
		vanaheim: "text-primary",
		jotunheim: "text-pink-600",
	};

	return (
		<div className="w-80">
			<h2
				className={`capitalize text-xl mb-3 font-semibold hidden md:block ${
					tableNameToClass[props.tableName] || ""
				}`}
			>
				{props.tableName}
			</h2>
			<div className="h-[500px] bg-gray-800 overflow-y-auto scrollbar-hide flex flex-col pb-4 px-4 rounded-lg mb-2">
				{messages.map((message, index) => {
					if (message.sender === deviceID) {
						return (
							<div key={index} className="chat chat-end">
								<div className="chat-bubble mt-4 chat-bubble-primary max-w-[250px] break-words">
									{message.message}
								</div>
							</div>
						);
					} else {
						return (
							<div key={index} className="chat chat-start">
								<div className="chat-bubble mt-4 chat-bubble-accent max-w-[250px] break-words">
									{message.message}
								</div>
							</div>
						);
					}
				})}
				<div ref={chatEndRef} />
			</div>
			<form className="flex justify-between" onSubmit={handleNewMessage}>
				<textarea
					className="bg-gray-900 w-full rounded-lg px-4 py-2 mr-2 resize-none overflow-auto scrollbar-hide focus:outline-none focus:ring focus:ring-emerald-600"
					value={newMessage}
					onChange={handleNewMessageChange}
					onKeyPress={(event) => {
						if (event.key === "Enter" && !event.shiftKey) {
							event.preventDefault();
							handleNewMessage(event);
						}
					}}
				/>
				<button type="submit">
					<IconSend size={28} color="#059669" />
				</button>
			</form>
		</div>
	);
}
