import { initORM } from '@/lib/orm';
import { RequestLog } from '@/entities/request-log.entity';
import { NextResponse } from 'next/server';

export async function GET() {
  const orm = await initORM();
  const em = orm.em.fork(); // use a forked EntityManager

  const logs = await em.find(RequestLog, {}, {
    orderBy: { createdAt: 'DESC' },
    limit: 100,
  });

  return NextResponse.json(logs);
}


// // src/app/api/history/route.ts
// import { NextResponse } from "next/server";
// import { initORM } from "@/lib/orm";
// import { RequestLog } from "@/entities/request-log.entity";

// export async function GET() {
//   try {
//     const orm = await initORM();
//     const em = orm.em.fork();
//     const logs = await em.find(RequestLog, {}, {
//       orderBy: { createdAt: "desc" }, // ✅ newest first
//     });

//     return NextResponse.json(logs);
//   } catch (error) {
//     console.error("Failed to fetch history:", error);
//     return NextResponse.json({ error: "Failed to load history" }, { status: 500 });
//   }
// }
