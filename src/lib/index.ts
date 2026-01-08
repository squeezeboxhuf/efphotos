// place files you want to import through the `$lib` alias in this folder.

import { and, eq, gte, like, lt, or } from "drizzle-orm"
import { db } from "./server/db"
import { photo, photoDates, yearMonths, years } from "./server/db/schema"

export async function getYearsData() {
	const data = await db
		.select()
		.from(years)
		.orderBy(years.year)
	return data
}

export async function getYearMonthsData(year: string) {
	const data = await db
		.select()
		.from(yearMonths)
		.where(eq(yearMonths.year, year))
		.orderBy(yearMonths.yearMonth)
	return data
}

export async function getDaysData(yearMonth: string) {
	const data = await db
		.select()
		.from(photoDates)
		.where(and(eq(photoDates.year, yearMonth.slice(0, 4)), eq(photoDates.month, yearMonth.slice(4, 6))))
		.orderBy(photoDates.photoDate)
	return data
}

export async function getPhotosData(yearMonthDay: string) {
	let dtstart: number, dtend: number
	switch (true) {
		case yearMonthDay.slice(4, 6) === "**":
			//single year filter
			{
				dtstart = Number(yearMonthDay.replaceAll("*", "0"))
				dtend = Number(`${Number(yearMonthDay.slice(0, 4)) + 1}0000`)
				// const count = await db.select({ totalPhotos: sql`COUNT(*)` }).from(photo).where(and(gte(photo.thisDate, dtstart), lt(photo.thisDate, dtend)))
				const res = await db
					.select()
					.from(photo)
					.where(and(gte(photo.thisDate, dtstart), lt(photo.thisDate, dtend)))
					.orderBy(photo.thisDate, photo.photo)
				return res;
			}
		case yearMonthDay.slice(6, 8) === "**":
			//year and month filter
			{
				dtstart = Number(yearMonthDay.replaceAll("*", "0"))
				dtend = Number(`${Number(yearMonthDay.slice(0, 6)) + 1}00`)
				// const count = await db.select({ totalPhotos: sql`COUNT(*)` }).from(photo).where(and(gte(photo.thisDate, dtstart), lt(photo.thisDate, dtend)))
				const res = await db
					.select()
					.from(photo)
					.where(and(gte(photo.thisDate, dtstart), lt(photo.thisDate, dtend)))
					.orderBy(photo.thisDate, photo.photo)
				return res
			}
		default:
			{
				const res = await db
					.select()
					.from(photo)
					.where(eq(photo.thisDate, Number(yearMonthDay)))
					.orderBy(photo.thisDate, photo.photo)
				return res
			}
	}
}
export async function getPhotosIds(yearMonthDay: string) {
	let dtstart: number, dtend: number
	switch (true) {
		case yearMonthDay.slice(4, 6) === "**":
			//single year filter
			{
				dtstart = Number(yearMonthDay.replaceAll("*", "0"))
				dtend = Number(`${Number(yearMonthDay.slice(0, 4)) + 1}0000`)
				const res = await db
					.select({ rowid: photo.rowid })
					.from(photo)
					.where(and(gte(photo.thisDate, dtstart), lt(photo.thisDate, dtend)))
					.orderBy(photo.thisDate, photo.photo)
					.limit(20)
				return res;
			}
		case yearMonthDay.slice(6, 8) === "**":
			//year and month filter
			{
				dtstart = Number(yearMonthDay.replaceAll("*", "0"))
				dtend = Number(`${Number(yearMonthDay.slice(0, 6)) + 1}00`)
				const res = await db
					.select({ rowid: photo.rowid })
					.from(photo)
					.where(and(gte(photo.thisDate, dtstart), lt(photo.thisDate, dtend)))
					.orderBy(photo.thisDate, photo.photo)
					.limit(20)
				return res
			}
		default:
			{
				const res = await db
					.select({ rowid: photo.rowid })
					.from(photo)
					.where(eq(photo.thisDate, Number(yearMonthDay)))
					.orderBy(photo.thisDate, photo.photo)
				return res
			}
	}
}

export async function getPhotoData(id: number) {
	return await db
		.select()
		.from(photo)
		.where(eq(photo.rowid, id))
}

export async function findPhotos(search: string) {
	// console.log("search", search)
	const res = await db
		.select()
		.from(photo)
		// .where(like(photo.title, `%${search}%`))
		.where(or(like(photo.title, `%${search}%`), like(photo.photosNarrative, `%${search}%`), like(photo.datesNarrative, `%${search}%`), like(photo.photosKeywords, `%${search}%`)))
		.orderBy(photo.thisDate, photo.photo)
	return res
}