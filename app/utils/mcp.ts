
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const createMCPServer = async () => {
    // Version should be updated whenever MCP server configuration changes
    // This ensures ChatGPT detects changes and doesn't use cached configurations
    const mcpServer = new McpServer({
        name: "chatgpt-starter-template",
        version: process.env.MCP_SERVER_VERSION ?? "1.0.2",
    });

    const remoteUrl =
        process.env.MCP_WIDGET_HELLOWORLD_URL ??
        "https://learn-chatgpt-app.vercel.app/widgets/sayhello";

    mcpServer.registerTool(
        "sayHello",
        {
            title: "say hello",
            description: "print a hello world message",
            _meta: {
                "openai/outputTemplate": "ui://widgets/sayhello.html",
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
        "ui://widgets/sayhello.html",
        {
            title: "helloWorld",
            description: `ChatGPT widget for hello world`,
            _meta: {
                "openai/widgetAccessible": true,
            },
        },
        async () => {

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
                        uri: "ui://widgets/sayhello.html",
                        mimeType: "text/html+skybridge",
                        text:
                            remoteHtml ??
                            `
<div style="color: #4d4d4d;">
    Unfortunately, the widget failed to load.
</div>`,
                    },
                ],
            };
        },
    );

    return mcpServer;
};