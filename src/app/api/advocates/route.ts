import { asc, count, gt } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const defaultCursor = 0;
  const defaultPageSize = 10;

  const body = await request.json();
  const cursor = body?.cursor ?? defaultCursor;
  const pageSize = body?.pageSize ?? defaultPageSize;

  // Uncomment this line to use a database
  const data = await db
    .select()
    .from(advocates)
    .where(gt(advocates.id, cursor))
    .limit(pageSize)
    .orderBy(asc(advocates.id));

  const advocateCountData = await db.select({ count: count() }).from(advocates);
  const advocateCount = advocateCountData[0].count;

  return Response.json({
    data,
    cursor: cursor + pageSize,
    count: advocateCount,
    body: request.json(),
  });
}
