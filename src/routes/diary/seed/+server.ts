import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { db } from '$lib/server/db';
import { diary } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';

async function processLineByLine() {
    await db.delete(diary)

    const fileStream = createReadStream('diaryformatted.txt');

    const rl = createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    let start = true
    let content = ''
    let lastDate = ''
    for await (const line of rl) {
        if (line.slice(0, 3) === "###") {
            if (start) {
                lastDate = line.slice(3)
            }
            else {
                if (content.length > 0) {
                    //write db row
                    try {
                        const dateTest = new Date(lastDate).toISOString().slice(0, 10)
                        await db.insert(diary).values({ entryDate: dateTest, content })
                        console.log("row", dateTest, content.slice(0, 10), content.length)
                    }
                    catch (err) {
                        console.log("error", line, err)
                    }
                    content = ''
                }
            }
            lastDate = line.slice(3)
            start = false
        }
        else {
            content += line
        }
    }
    await db.insert(diary).values({ entryDate: new Date(lastDate).toISOString().slice(0, 10), content })
    console.log("last row", new Date(lastDate), content.slice(0, 10))
}

export const GET: RequestHandler = () => {
    processLineByLine();
    return new Response(String("ok"));
}