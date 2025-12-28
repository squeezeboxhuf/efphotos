import { eq } from "drizzle-orm"
import { db } from "$lib/server/db"
import { photoDates } from "$lib/server/db/schema"

export const load = async ({ params }) => {
  console.log("yearmonth", params.yearmonth)
  const monthData = await db.select().from(photoDates).where(eq(photoDates.yearMonth, params.yearmonth))

  return { monthData }
}