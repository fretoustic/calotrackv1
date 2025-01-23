import { useState } from "react";
import "./DialogBox.css";
import "./customDialog.css";

interface CustomDialogProps {
  title: string;
  fields: Array<{ label: string; type: string; id: string }>;
  onSubmit: (values: Record<string, string | number>) => void;
  triggerButton: React.ReactNode;
}

const CustomDialog = ({
  title,
  fields,
  onSubmit,
  triggerButton,
}: CustomDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setValues({});
  };

  const handleSubmit = () => {
    onSubmit(values);
    handleClose();
  };

  return (
    <div>
      <div onClick={handleOpen}>{triggerButton}</div>

      {isOpen && (
        <div className="dialog-overlay">
          <div className="dialog-content custom-dialog">
            <h2>{title}</h2>
            <div className="fields">
              {fields.map((field) => (
                <div key={field.id} className="dialog-field custom-dialog-field">
                  <label htmlFor={field.id}>{field.label}</label>
                  <input
                    id={field.id}
                    type={field.type}
                    value={values[field.id] || ""}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        [field.id]: e.target.value,
                      }))
                    }
                  />
                </div>
              ))}
            </div>
            <div className="dialog-buttons">
              <button onClick={handleSubmit}>Save</button>
              <button onClick={handleClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDialog;
