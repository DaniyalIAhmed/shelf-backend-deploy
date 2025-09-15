"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cron_1 = require("cron");
const https_1 = __importDefault(require("https"));
const job = new cron_1.CronJob('*/14 * * * *', // cronTime
function () {
    https_1.default.get(process.env.API_URL || "", (res) => {
        if (res.statusCode === 200) {
            console.log("Server is running");
        }
        else
            console.log("Get request failed", res.statusCode);
    }).on("error", (err) => {
        console.log("Error while sending get request", err);
    });
} // timeZone
);
exports.default = job;
//# sourceMappingURL=cron.lib.js.map