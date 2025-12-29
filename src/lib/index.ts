// place files you want to import through the `$lib` alias in this folder.

import { and, eq, gte, lt } from "drizzle-orm"
import { db } from "./server/db"
import { photo, photoDates, yearMonths, years } from "./server/db/schema"

export async function getYearsData() {
	const data = await db
		.select()
		.from(years)
	return data
}

export async function getYearMonthsData(year: string) {
	const data = await db
		.select()
		.from(yearMonths)
		.where(eq(yearMonths.year, year))
	return data
}

export async function getDaysData(yearMonth: string) {
	const data = await db
		.select()
		.from(photoDates)
		.where(and(eq(photoDates.year, yearMonth.slice(0, 4)), eq(photoDates.month, yearMonth.slice(4, 6))))
	return data
}

export async function getPhotosData(yearMonthDay: string) {
	let dtstart: number, dtend: number
	switch (true) {
		case yearMonthDay.slice(4, 6) === "**":
			//single year filter
			dtstart = Number(yearMonthDay.replaceAll("*", "0"))
			dtend = Number(`${Number(yearMonthDay.slice(0, 4)) + 1}0000`)
			return await db
				.select()
				.from(photo)
				.where(and(gte(photo.thisDate, dtstart), lt(photo.thisDate, dtend)))
				.limit(20)

		case yearMonthDay.slice(6, 8) === "**":
			//year and month filter
			dtstart = Number(yearMonthDay.replaceAll("*", "0"))
			dtend = Number(`${Number(yearMonthDay.slice(0, 6)) + 1}00`)
			return await db
				.select()
				.from(photo)
				.where(and(gte(photo.thisDate, dtstart), lt(photo.thisDate, dtend)))
				.limit(20)

		default:
			return await db
				.select()
				.from(photo)
				.where(eq(photo.thisDate, Number(yearMonthDay)))
	}
}