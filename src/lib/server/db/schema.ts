import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const photo = sqliteTable('photos', {
  thisDate: integer('ThisDate'),
  title: text('Title'),
  photosNarrative: text('Photos_Narrative'),
  photosKeywords: text('Photos_Keywords'),
  photo: text('Photo'),
  credits: text('Credits'),
  datesNarrative: text('Dates_Narrative'),
  datesKeywords: text('Dates_Keywords'),
});

export const photoDates = sqliteTable('photoDates', {
  photoDate: text('photodate'),
  photoCount: integer('photocount'),
  yearMonth: text('yearmonth'),
  year: text('year'),
  month: text('month'),
});

export const years = sqliteTable('photoyears', {
  year: text('year'),
  photoCount: integer('photocount'),
});

export const yearMonths = sqliteTable('photoyearmonths', {
  yearMonth: text('yearmonth'),
  photoCount: integer('photocount'),
  year: text('year'),
  month: text('month'),
});

export type Photo = typeof photo.$inferSelect
export type PhotoDate = typeof photoDates.$inferSelect
export type Year = typeof years.$inferSelect
export type YearMonth = typeof yearMonths.$inferSelect