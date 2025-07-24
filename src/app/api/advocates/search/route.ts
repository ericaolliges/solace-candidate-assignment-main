import { and, asc, count, desc, gt, like, sql } from "drizzle-orm";
import db from "../../../../db";
import { advocates } from "../../../../db/schema";
import { NextRequest } from "next/server";

const fieldToSearch = (searchCriteria: string) => {
  switch (searchCriteria) {
    case "specialty":
      return sql`lower(${advocates.specialties}::text)`;
    case "city":
      return sql`lower(${advocates.city})`;
    case "name":
      return sql`concat(lower(${advocates.firstName}), ' ', lower(${advocates.lastName}))`;
  }
};

export async function POST(request: NextRequest) {
  const defaultCursor = 0;
  const defaultPageSize = 10;

  const body = await request.json();
  const cursor = body?.cursor ?? defaultCursor;
  const pageSize = body?.pageSize ?? defaultPageSize;
  const searchTerm: string = body?.searchTerm ?? "";
  const searchCriteria = body?.searchCriteria ?? "";

  const field = fieldToSearch(searchCriteria);

  // Uncomment this line to use a database
  const data = await db
    .select()
    .from(advocates)
    .where(
      and(
        like(field, `%${searchTerm.toLowerCase()}%`),
        gt(advocates.id, cursor)
      )
    )
    .limit(pageSize)
    .orderBy(asc(advocates.id));
  const advocateCursor = data.slice(-1)[0];

  const lastAdvocateData = await db
    .select({ last: advocates.id })
    .from(advocates)
    .where(like(field, `%${searchTerm.toLowerCase()}%`))
    .limit(1)
    .orderBy(desc(advocates.id));
  const lastId = lastAdvocateData[0].last;

  return Response.json({
    data,
    cursor: advocateCursor.id,
    count: lastId,
    body: request.json(),
  });
}
