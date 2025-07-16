import { asc, gt } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function POST(body: { cursor?: number; pageSize?: number }) {
  const defaultPageSize = 7;
  const cursor = body.cursor ?? 0;
  const pageSize = body?.pageSize ?? defaultPageSize;

  // Uncomment this line to use a database
  const data = await db
    .select()
    .from(advocates)
    .where(gt(advocates.id, cursor))
    .limit(pageSize)
    .orderBy(asc(advocates.id));

  return Response.json({ data, cursor: cursor + pageSize });
}
