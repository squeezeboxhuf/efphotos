import { eq } from "drizzle-orm"
import { db } from "$lib/server/db"
import { photo } from "$lib/server/db/schema"

export const load = async ({ params }) => {
  const dayData = await db.select().from(photo).where(eq(photo.thisDate, Number(params.date)))
  return { dayData }
}