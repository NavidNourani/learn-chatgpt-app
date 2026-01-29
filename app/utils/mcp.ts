
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const createMCPServer = async () => {
    const mcpServer = new McpServer({
        name: "chatgpt-starter-template",
        version: "1.0.0",
    });

    mcpServer.registerTool(
        "sayHello",
        {
            title: "say hello",
            description: "print a hello world message",
            _meta: {
                "openai/outputTemplate": "ui://widget/widget.html",
                "openai/toolInvocation/invoking": "Mentally prepping to say hello",
                "openai/toolInvocation/invoked": "Hello has been said",
                "openai/widgetAccessible": true,
            },
        },
        async () => {
            return {
                structuredContent: {},
                content: [
                    {
                        type: "text",
                        text: "I said hello to the world"
                    },
                ],
            };
        },
    );

    mcpServer.registerResource(
        "helloWorld",
        "ui://widget/widget.html",
        {
            title: "helloWorld",
            description: `ChatGPT widget for hello world`,
        },
        async () => {
            return {
                contents: [
                    {
                        uri: "ui://widget/widget.html",
                        mimeType: "text/html+skybridge",
                        text: `<style>
    #hello {
        color: #4d4d4d;
    }
</style>

<div id="hello">
    hello, world
</div>

<script type="module">
    window.addEventListener("openai:tool_response", (e) => {
        console.log("Tool response:", e.detail);
    });

    window.addEventListener("openai:set_globals", () => {
        console.log("Layout/theme changed:", window.openai?.theme);
        console.log("Max height changed:", window.openai?.maxHeight);
    });
</script>`,
                    },
                ],
            };
        },
    );

    return mcpServer;
};