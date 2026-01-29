"use client";
import { useState } from "react";
import { useWidgetState } from "@/app/hooks/use-widget-state";

export const dynamic = "force-static";

const SayHello = () => {
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
            <input type="text" value={widgetState.name} onChange={(e) => setWidgetState({ name: e.target.value })} />
            <button onClick={handleSayHello}>Say Hello</button>
        </div>
    );
};

export default SayHello;