// Fails while any placeholder UNKNOWN remains in data/*.ts (comment lines ignored).
import { readdirSync, readFileSync } from "node:fs";

let found = 0;
for (const file of readdirSync("data")) {
  readFileSync(`data/${file}`, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (line.trim().startsWith("//") || !line.includes("UNKNOWN")) return;
      console.error(`data/${file}:${i + 1}: ${line.trim()}`);
      found++;
    });
}

if (found) {
  console.error(`\n${found} UNKNOWN value(s). Fill them before launch.`);
  process.exit(1);
}
console.log("data OK: no UNKNOWN values.");
