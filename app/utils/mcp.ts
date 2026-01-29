
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
                "openai/outputTemplate": "ui://widgets/sayhello",
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
            const remoteUrl =
                process.env.MCP_WIDGET_HELLOWORLD_URL ??
                "https://learn-chatgpt-app.vercel.app/widgets/sayhello";

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 7_000);

            let remoteHtml: string | undefined;
            try {
                const res = await fetch(remoteUrl, {
                    headers: { Accept: "text/html,application/xhtml+xml" },
                    signal: controller.signal,
                });
                if (res.ok) {
                    remoteHtml = await res.text();
                } else {
                    console.warn(
                        `helloWorld widget fetch failed (${res.status} ${res.statusText}) from ${remoteUrl}`,
                    );
                }
            } catch (err) {
                console.warn(`helloWorld widget fetch failed from ${remoteUrl}`, err);
            } finally {
                clearTimeout(timeout);
            }

            return {
                contents: [
                    {
                        uri: "ui://widgets/sayhello",
                        mimeType: "text/html+skybridge",
                        text:
                            remoteHtml ??
                            `<style>
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