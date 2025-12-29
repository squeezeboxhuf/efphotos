import * as v from 'valibot';
import { query } from "$app/server"
import { getDaysData, getPhotosData, getYearMonthsData, getYearsData } from "$lib";

export const getYears = query(async () => {
	const yearsData = await getYearsData()
	return { yearsData }
})

export const getYearMonths = query(v.string(), async (year) => {
	if (year === "0") {
		return {
			monthsData: [{
				yearMonth: '',
				photoCount: 0,
				year: "0",
				month: "0"
			}]
		}
	}
	const monthsData = await getYearMonthsData(year)
	return { monthsData }
})
export const getYearMonthDays = query(v.string(), async (yearmonth) => {
	if (yearmonth === "0") {
		return {
			dayData: [{
				photoDate: "0",
				yearMonth: '',
				photoCount: 0,
				year: "0",
				month: "0"
			}]
		}
	}
	const dayData = await getDaysData(yearmonth)
	return { dayData }
})
export const getPhotos = query(v.string(), async (yearmonthday) => {
	if (yearmonthday === "0") {
		return {
			photoData: [{
				thisDate: "oops",
				title: '',
				photosNarrative: '',
				photosKeyword: '',
				photo: '',
				credits: '',
				datesNarrative: "",
				datesKeywords: ''
			}]
		}
	}
	const photoData = await getPhotosData(yearmonthday)
	return { photoData }
})