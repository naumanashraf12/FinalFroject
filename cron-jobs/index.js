var cron = require("node-cron");
var clearProducts = require("./clearProducts");
function startCronJobs() {
  console.log("Starting Cron Jobs");
  clearProducts();
  cron.schedule("*/30 * * * *", () => {
    clearProducts();
  });
}

module.exports.startCronJobs = startCronJobs;
