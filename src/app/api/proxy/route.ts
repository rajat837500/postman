import { NextRequest, NextResponse } from "next/server";
import { initORM } from "@/lib/orm"; // You’ll need a MikroORM init helper
import { RequestLog } from "@/entities/request-log.entity";

export async function POST(req: NextRequest) {
  const start = Date.now();
  const orm = await initORM();
  const em = orm.em.fork();
  const log = em.create(RequestLog, {
    url: "",
    method: "",
    headers: {},
    body: null,
    responseStatus: 0,
    durationMs: 0,
    createdAt: new Date(),
  });
  await em.persistAndFlush(log);

  try {
    const { url, method, headers = {}, body } = await req.json();

    const fetchOptions: RequestInit = {
      method,
      headers,
      body: method !== "GET" && method !== "HEAD" ? body : undefined,
    };

    const response = await fetch(url, fetchOptions);
    const resBody = await response.text();

    const durationMs = Date.now() - start;

    // ✅ Save to NeonDB using MikroORM
    const orm = await initORM(); // custom helper to init MikroORM
    const em = orm.em.fork();
    const log = em.create(RequestLog, {
      url,
      method,
      headers,
      body,
      responseStatus: response.status,
      durationMs,
      createdAt: new Date(),
    });
    await em.persistAndFlush(log);

    const resHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      resHeaders[key] = value;
    });

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: resHeaders,
      body: resBody,
    });
  } catch (error: any) {
    console.error("Server request error:", error);
    return NextResponse.json(
      { error: "Request failed", details: error.message },
      { status: 500 }
    );
  }
}


// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const startTime = Date.now();

//   try {
//     const { url, method, headers = {}, body } = await req.json();

//     const fetchOptions: RequestInit = {
//       method,
//       headers,
//       body: method !== "GET" && method !== "HEAD" ? body : undefined,
//     };

//     const response = await fetch(url, fetchOptions);

//     const resBody = await response.text();
//     const resHeaders: Record<string, string> = {};
//     response.headers.forEach((value, key) => {
//       resHeaders[key] = value;
//     });

//     // 🔄 Log request and response to NestJS backend
//     const logPayload = {
//       url,
//       method,
//       headers,
//       body,
//       responseStatus: response.status,
//       durationMs: Date.now() - startTime,
//     };

//     await fetch(`${process.env.NEST_API_BASE_URL}/logs`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(logPayload),
//     });

//     return NextResponse.json({
//       status: response.status,
//       statusText: response.statusText,
//       headers: resHeaders,
//       body: resBody,
//     });
//   } catch (error: any) {
//     console.error("Server request error:", error);
//     return NextResponse.json(
//       { error: "Request failed", details: error.message },
//       { status: 500 }
//     );
//   }
// }
