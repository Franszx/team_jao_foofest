import LiveChat from "@/components/LiveChat";

export default function page() {
	return (
		<div className="flex flex-col md:flex-row justify-between">
			<LiveChat tableName="midgard" />
			<LiveChat tableName="vanaheim" />
			<LiveChat tableName="jotunheim" />
		</div>
	);
}
