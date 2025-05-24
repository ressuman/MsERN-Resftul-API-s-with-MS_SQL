// File: utils/loadAllSql.js

"use strict";

const fs = require("fs-extra");
const { join } = require("path");

const loadSqlQueries = async (folderName) => {
  try {
    const filePath = join(process.cwd(), "connection", "data", folderName);
    const files = await fs.readdir(filePath);
    const sqlFiles = files.filter((f) => f.endsWith(".sql"));
    const queries = {};

    for (const sqlFile of sqlFiles) {
      const query = await fs.readFile(join(filePath, sqlFile), {
        encoding: "utf8",
      });
      queries[sqlFile.replace(".sql", "")] = query;
    }

    return queries;
  } catch (error) {
    console.error(
      `Error loading SQL queries from folder '${folderName}':`,
      error.message
    );
    throw error;
  }
};

module.exports = loadSqlQueries;
