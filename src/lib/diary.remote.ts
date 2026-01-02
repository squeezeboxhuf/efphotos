import * as v from 'valibot';
import { query } from "$app/server"
import { db } from './server/db';
import { diary } from './server/db/schema';
import { like, sql } from 'drizzle-orm';

export const getDiary = query(v.number(), async (offset = 0) => {
    console.log("get diary page", offset)
    const data = await db.select().from(diary).offset(offset * 100).limit(100).orderBy(diary.entryDate)
    return data
})

export const getDiaryYear = query(v.string(), async (year) => {

    const yearData = await db.select().from(diary).where(like(diary.entryDate, `${year}%`)).orderBy(diary.entryDate)
    return yearData
})

export const listYears = query(async () => {
    const yearsList = await db.selectDistinct({ year: sql`substr(entryDate,0,5)` }).from(diary).orderBy(diary.entryDate)
    return yearsList
})

export const diarySearch = query(v.string(), async (search) => {
    const searchResult = await db.select().from(diary).where(like(diary.content, `%${search}%`)).orderBy(diary.entryDate)
    return searchResult
})