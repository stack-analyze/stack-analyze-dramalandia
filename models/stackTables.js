const { Table } = require("console-table-printer")

const stackTable = new Table({
  columns: [
    {
      name: "techName",
      alignment: "left",
      color: "cyan"
    },
    {
      name: "techWebsite",
      alignment: "left",
      color: "green"
    },
    {
      name: "techCategories",
      alignment: "left",
      color: "cyan"
    }
  ]
});

module.exports = stackTable