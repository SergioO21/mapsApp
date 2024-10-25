/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
require("dotenv").config();
const { writeFileSync, mkdirSync } = require("fs");

const targetPath = "./src/environments/environment.ts";
const folderPath = "./src/environments";

const envFileContent = `
export const environment = {
  mapbox_key: "${process.env.MAPBOX_KEY}"
};
`;

mkdirSync(folderPath, { recursive: true });
writeFileSync(targetPath, envFileContent);
