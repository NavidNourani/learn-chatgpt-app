"use client";
import { useCallback } from "react";
import { useWidgetState } from "@/app/hooks/use-widget-state";

const SayHello = () => {
    const [widgetState, setWidgetState] = useWidgetState<{
        name: string;
    }>({
        name: "John Doe",
    });

    const handleSayHello = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Button clicked!", widgetState);
        setWidgetState({ name: "John Doe" });
    }, [setWidgetState, widgetState]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        console.log("Input changed:", value);
        setWidgetState({ name: value });
    }, [setWidgetState]);
    
    return (
        <div>
            <h1 className="text-2xl font-bold text-white">Hello {widgetState?.name || "Guest"}</h1>
            <input 
                type="text" 
                value={widgetState?.name || ""} 
                onChange={handleInputChange}
                style={{ color: "black", padding: "8px", margin: "8px 0" }}
            />
            <button 
                onClick={handleSayHello}
                style={{ 
                    padding: "8px 16px", 
                    margin: "8px 0",
                    cursor: "pointer",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px"
                }}
            >
                Say Hello
            </button>
        </div>
    );
};

export default SayHello;