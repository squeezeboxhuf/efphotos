import { eq } from "drizzle-orm"
import { db } from "$lib/server/db"
import { yearMonths } from "$lib/server/db/schema"

export const load = async ({ params }) => {
  console.log("year", params.year)
  const yearMonthsData = await db.select().from(yearMonths).where(eq(yearMonths.year, params.year))

  return { yearMonths: yearMonthsData }
}