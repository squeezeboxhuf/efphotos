// import { getPhotosIds } from '$lib';
import { getContext, setContext } from 'svelte';


export type Selection = {
    selectedYear: string, selectedMonth: string, selectedDay: string, rowId: number, idTable: number[]
}

export class Selections {
    state = $state<Selection>({ selectedYear: "0000", selectedMonth: "00", selectedDay: "00", rowId: 99999, idTable: [] })
    selectYear(year: string) {
        this.state.selectedYear = year
        this.state.selectedMonth = "00"
        this.state.selectedDay = `D${year}****`
        // getPhotosIds(`${year}****`).then((idList) => {
        //     this.state.idTable = [...idList.map(p => p.rowid ?? 0)]
        // })

    }
    selectMonth(month: string) {
        this.state.selectedMonth = month
        this.state.selectedDay = `D${this.state.selectedYear}${month}**`
        // getPhotosIds(`${this.state.selectedYear}${month}**`).then((idList) => {
        //     this.state.idTable = [...idList.map(p => p.rowid ?? 0)]
        // })
    }
    selectDay(day: string) {
        this.state.selectedDay = day
        // getPhotosIds(`${this.state.selectedYear}${this.state.selectedMonth}${day}`).then((idList) => {
        //     this.state.idTable = [...idList.map(p => p.rowid ?? 0)]
        // })
    }
    selectId(id: number) {
        this.state.rowId = id
    }
    setIdTable(res: number[]) { this.state.idTable = [...res] }
}

const CURRENT_SELECTION_KEY = Symbol('YEAR')

export function setSelectionState() {
    return setContext(CURRENT_SELECTION_KEY, new Selections())
}

export function getSelections() {
    return getContext<ReturnType<typeof setSelectionState>>(CURRENT_SELECTION_KEY)
}

// export const setIdTable = (res: number[]) => {
//     const selections = getSelections()
//     selections.setIdTable(res)
// }
// export type Year = {
//     year: number | null, photoCount: number | null
// }
// export type YearState = {
//     years: Year[], selectedYear: number
// }

// export class Years {
//     yearState: YearState = $state({ years: [{ year: 1900, photoCount: 0 }], selectedYear: 0 })

//     constructor(years: Year[], selectedYear: number) {
//         this.yearState = { years: [...years], selectedYear }
//     }

//     selectYear(year: number) {
//         this.yearState.selectedYear = year
//     }
// }

// const CURRENT_YEAR_KEY = Symbol('YEAR')

// export function setYearsState(years: Year[] = [], selectedYear: number = 0) {
//     return setContext(CURRENT_YEAR_KEY, new Years(years, selectedYear))
// }

// export function getYearsState() {
//     return getContext<ReturnType<typeof setYearsState>>(CURRENT_YEAR_KEY)
// }

// export type YearMonth = {
//     year: number, month: number, yearMonth: number, photoCount: number
// }
// export class YearMonths {
//     yearMonths: YearMonth[] = $state([{ year: 1900, month: 1, yearMonth: 190001, photoCount: 0 }])

//     constructor(yearMonths: YearMonth[]) {
//         this.yearMonths = [...yearMonths]
//     }

//     setYearMonth(yearMonths: YearMonth[]) {
//         this.yearMonths = [...yearMonths]
//     }
// }

// const CURRENT_YEARMONTH_KEY = Symbol('YEAR')

// export function setYearMonthsState(yearMonths: YearMonth[] = []) {
//     return setContext(CURRENT_YEARMONTH_KEY, new YearMonths(yearMonths))
// }

// export function getYearMonthsState() {
//     return getContext<ReturnType<typeof setYearMonthsState>>(CURRENT_YEARMONTH_KEY)
// }

