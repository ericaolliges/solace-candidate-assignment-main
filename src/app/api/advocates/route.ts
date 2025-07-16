import { asc, gt } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function POST(body: { cursor?: number; pageSize?: number }) {
  const defaultPageSize = 7;

  // Uncomment this line to use a database
  const data = await db
    .select()
    .from(advocates)
    .where(body.cursor ? gt(advocates.id, body.cursor) : undefined)
    .limit(body?.pageSize ?? defaultPageSize)
    .orderBy(asc(advocates.id));

  return Response.json({ data });
}
