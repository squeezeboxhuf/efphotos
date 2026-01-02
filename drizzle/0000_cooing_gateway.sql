CREATE TABLE `diary` (
	`entryDate` integer,
	`content` text
);
--> statement-breakpoint
CREATE TABLE `photos` (
	`rowid` integer,
	`ThisDate` integer,
	`Title` text,
	`Photos_Narrative` text,
	`Photos_Keywords` text,
	`Photo` text,
	`Credits` text,
	`Dates_Narrative` text,
	`Dates_Keywords` text
);
--> statement-breakpoint
CREATE TABLE `photoDates` (
	`photodate` text,
	`photocount` integer,
	`yearmonth` text,
	`year` text,
	`month` text
);
--> statement-breakpoint
CREATE TABLE `photoyearmonths` (
	`yearmonth` text,
	`photocount` integer,
	`year` text,
	`month` text
);
--> statement-breakpoint
CREATE TABLE `photoyears` (
	`year` text,
	`photocount` integer
);
