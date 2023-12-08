"use client";

import { useState } from "react";
import LiveChat from "./LiveChat";

export default function WrapperLiveChat() {
	const [activeChat, setActiveChat] = useState("midgard");

	return (
		<div className="flex flex-col gap-4 items-center md:flex-row justify-between">
			<div className="flex gap-4 md:hidden">
				<button
					className={`text-md bg-gray-900 border-2 w-fit py-2 px-3 mt-2 rounded-lg ${
						activeChat === "midgard"
							? "text-gray-50 border-emerald-600"
							: "text-gray-400 border-gray-800"
					}`}
					onClick={() => setActiveChat("midgard")}
				>
					Midgard
				</button>
				<button
					className={`text-md bg-gray-900 border-2 w-fit py-2 px-3 mt-2 rounded-lg ${
						activeChat === "vanaheim"
							? "text-gray-50 border-emerald-600"
							: "text-gray-400 border-gray-800"
					}`}
					onClick={() => setActiveChat("vanaheim")}
				>
					Vanaheim
				</button>
				<button
					className={`text-md bg-gray-900 border-2 w-fit py-2 px-3 mt-2 rounded-lg ${
						activeChat === "jotunheim"
							? "text-gray-50 border-emerald-600"
							: "text-gray-400 border-gray-800"
					}`}
					onClick={() => setActiveChat("jotunheim")}
				>
					Jotunheim
				</button>
			</div>

			<div className="md:hidden">
				{activeChat === "midgard" && <LiveChat tableName="midgard" />}
				{activeChat === "vanaheim" && <LiveChat tableName="vanaheim" />}
				{activeChat === "jotunheim" && <LiveChat tableName="jotunheim" />}
			</div>

			<div className="hidden gap-4 md:flex md:flex-row md:justify-between">
				<LiveChat tableName="midgard" />
				<LiveChat tableName="vanaheim" />
				<LiveChat tableName="jotunheim" />
			</div>
		</div>
	);
}
