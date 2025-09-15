import { CronJob } from 'cron';
import https from 'https';

const job = new CronJob(
	'*/14 * * * *', // cronTime
	function () {
		https.get(process.env.API_URL||"", (res)=>{
            if(res.statusCode === 200){
                console.log("Server is running");
            }
            else console.log("Get request failed", res.statusCode);
        }).on("error", (err)=>{
            console.log("Error while sending get request", err);
        });
     } // timeZone
);

export default job;