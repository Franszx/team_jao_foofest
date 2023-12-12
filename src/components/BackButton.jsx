"use client";

export default function BackButton() {
	const goBack = () => {
		if (typeof window !== "undefined") {
			window.history.back();
		}
	};

	return (
		<button
			onClick={goBack}
			className="text-sm text-gray-400 bg-gray-900 border-2 border-gray-800 w-fit h-fit py-2 px-3 mt-2 rounded-lg whitespace-nowrap"
		>
			&#8592; Back
		</button>
	);
}
