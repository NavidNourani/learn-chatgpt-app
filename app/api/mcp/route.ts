import { createMCPServer } from "@/app/utils/mcp";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

export const runtime = "nodejs";

const transport = new WebStandardStreamableHTTPServerTransport({
  // Stateless mode (no persistent sessions required)
  sessionIdGenerator: undefined,
  enableJsonResponse: true,
});

let connectOnce: Promise<void> | undefined;

async function ensureConnected() {
  if (!connectOnce) {
    connectOnce = (async () => {
      const server = await createMCPServer();
      await server.connect(transport);
    })();
  }
  return connectOnce;
}

function withCors(response: Response) {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, mcp-session-id, last-event-id, mcp-protocol-version",
  );
  headers.set("Access-Control-Expose-Headers", "mcp-session-id, mcp-protocol-version");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function OPTIONS() {
  return withCors(new Response(null, { status: 204 }));
}

export async function POST(request: Request) {
  try {
    await ensureConnected();
    return withCors(await transport.handleRequest(request));
  } catch (error) {
    console.error("Failed to handle MCP request", error);
    return withCors(new Response("Failed to handle MCP request", { status: 500 }));
  }
}

export async function GET(request: Request) {
  try {
    await ensureConnected();
    return withCors(await transport.handleRequest(request));
  } catch (error) {
    console.error("Failed to handle MCP request", error);
    return withCors(new Response("Failed to handle MCP request", { status: 500 }));
  }
}

export async function DELETE(request: Request) {
  try {
    await ensureConnected();
    return withCors(await transport.handleRequest(request));
  } catch (error) {
    console.error("Failed to handle MCP request", error);
    return withCors(new Response("Failed to handle MCP request", { status: 500 }));
  }
}