import { writeFileSync } from "fs";

let x = 0

let all = ""

let i = 1

while (x < 8640) {
    x += 9
    all += `| ${i} - [[${x}]] `
    i++
}

writeFileSync('all_9s_wf.md', all, {encoding: 'utf-8'})