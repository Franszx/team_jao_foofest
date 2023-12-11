import { useEffect, useRef, useState } from "react";

export default function CampDisplay(props) {
  const { camp, selectedCamp } = props;
  const isActive = selectedCamp && camp.area === selectedCamp.area;
  const [isClicked, setIsClicked] = useState(false);
  const divRef = useRef(null);

  const handleClick = () => {
    setIsClicked(true);
    props.onClick();
  };

  useEffect(() => {
    if (isClicked && divRef.current) {
      divRef.current.addEventListener("animationend", () => {
        setIsClicked(false);
      });
    }
  }, [isClicked]);

  const campColors = {
    Svartheim: "bg-red-600 border-red-700",
    Nilfheim: "bg-purple-800 border-purple-900",
    Helheim: "bg-green-500 border-green-600",
    Muspelheim: "bg-yellow-600 border-yellow-700",
    Alfheim: "bg-sky-800 border-sky-900",
  };
  return (
    <div
      ref={divRef}
      className={`font-normal flex justify-between w-full hover:text-gray-100 border rounded-lg mb-4 py-7 px-6 bg-opacity-20 hover:bg-opacity-60 hover:cursor-pointer transition-all ${
        isActive ? "bg-opacity-60 text-gray-50" : "text-gray-400"
      } ${isClicked ? "ani_scale" : ""} ${
        props.available === 0
          ? "text-gray-600 bg-gray-800 border-gray-900"
          : campColors[props.campName] || "bg-gray-700 border-gray-800"
      }`}
      onClick={handleClick}
    >
      <p>{props.campName}</p>
      <p>
        {props.available} / {props.spots}
      </p>
    </div>
  );
}
