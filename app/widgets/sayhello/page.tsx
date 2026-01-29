"use client";
import { useWidgetState } from "@/app/hooks/useWidgetState";
import { useState } from "react";

export const dynamic = "force-static";

const SayHello = () => {
    const [name, setName] = useState<string>("John Doe");
    const [widgetState, setWidgetState] = useWidgetState<{
        name: string;
    }>({
        name: "John Doe",
    });

    const handleSayHello = () => {
        setWidgetState({ name: "John Doe" });
    };
    return (
        <div>
            <h1 className="text-2xl font-bold text-white">Hello {widgetState.name}</h1>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={handleSayHello}>Say Hello</button>
        </div>
    );
};

export default SayHello;