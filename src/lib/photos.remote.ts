import * as v from 'valibot';
import { command, query } from "$app/server"
import { findPhotos, getDaysData, getPhotoData, getPhotosData, getYearMonthsData, getYearsData } from "$lib";

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
export const getPhotos = query(v.string(), async (searchParam) => {
	// console.log("get", searchParam)
	if (searchParam.slice(0, 1) === "S") {
		if (searchParam.slice(1).trim() !== '') {
			// console.log("get search", searchParam.slice(1))
			const photoData = await findPhotos(searchParam.slice(1))
			return { photoData }
		}
		else {
			return {
				photoData: [{
					rowid: 999999,
					thisDate: "",
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
	}
	else {
		// console.log("get date", searchParam.slice(1))
		const photoData = await getPhotosData(searchParam.slice(1))
		return { photoData }
	}


	// if (yearmonthday === "0") {
	// 	return {
	// 		photoData: [{
	// 			rowid: 999999,
	// 			thisDate: "",
	// 			title: '',
	// 			photosNarrative: '',
	// 			photosKeyword: '',
	// 			photo: '',
	// 			credits: '',
	// 			datesNarrative: "",
	// 			datesKeywords: ''
	// 		}]
	// 	}
	// }
})

export const getPhoto = query(v.number(), async (id) => {
	if (id === 99999) {
		return {
			photo:
				[{
					rowid: 999999,
					thisDate: "",
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
	const data = await getPhotoData(id)
	return { photo: data }
})

export const search = command(
	v.string()
	,
	async (searchText) => {
		const res = await findPhotos(searchText)
		return res
	}
);