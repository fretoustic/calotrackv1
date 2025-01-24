import { useState } from "react";
import "./DialogBox.css";
import {
  useCalorieTargetStore,
  useWaterTargetStore,
  useUserProfileStore,
} from "../../../store";
import { WaterBox } from "../waterbox";
import CalorieBox from "../caloriebox";

interface DialogBoxProps {
  type?: string;
  title?: string;
  fields?: Array<{ label: string; type: string; id: string }>;
  onSubmit?: (values: any) => void;
  triggerButton?: React.ReactNode;
}

const DialogBox = ({ type }: DialogBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const { setWaterTarget } = useWaterTargetStore();
  const { setCalorieTarget } = useCalorieTargetStore();
  const { weightKg, heightCm } = useUserProfileStore();

  const handleClose = () => {
    setIsOpen(false);
    setInputText("");
  };

  const handleSubmit = () => {
    setWaterTarget(parseInt(inputText));
    handleClose();
  };
  const handleCalorieSubmit = () => {
    setCalorieTarget(parseInt(inputText));
    handleClose();
  };

  if (type === "water") {
    return (
      <WaterBox
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        inputText={inputText}
        setInputText={setInputText}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    );
  } else if (type === "calorie") {
    return (
      <CalorieBox
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        inputText={inputText}
        setInputText={setInputText}
        handleCalorieSubmit={handleCalorieSubmit}
        handleClose={handleClose}
        weightKg={weightKg}
        heightCm={heightCm}
      />
    );
  }
};

export default DialogBox;
