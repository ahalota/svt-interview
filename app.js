const express = require('express');
const https = require('https');

const app = express();
const port = 5000;

const robotListEndpoints = ['https://60c8ed887dafc90017ffbd56.mockapi.io/robots', 'https://svtrobotics.free.beeceptor.com/robots'];

//src: https://github.com/expressjs/express/blob/master/examples/web-service/index.js
function error(status, msg) {
    var err = new Error(msg);
    err.status = status;
    return err;
}

app.post('/api/robots/closest', (req,res, next) => {
    //1. Check for valid request. If not, send error.
    if (!req.query['x']) return next(error(400, 'x required.'));
    if (!req.query['y']) return next(error(400, 'y required.'));

    //2. Get robot list. Go through both if first fails. If both fail, return error message.
    https.get(robotListEndpoints[0], (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            let closestRobot;
            let minDistance = Number.MAX_VALUE;
            let maxBattery = Number.MIN_VALUE;
            let robotList = JSON.parse(data);
            let toFind = req.query;
            
            robotList.forEach(curRobot => {
                let curDistance = Math.sqrt(
                    Math.pow(curRobot.x-toFind.x,2)+
                    Math.pow(curRobot.y-toFind.y,2)
                );

                //3. Find nearest. 
                //If there is more than 1 robot within 10 distance units of the load, 
                //return the one with the most battery remaining                
                if (curDistance <= 10) { //If within 10 distance, pick the one with the most battery
                    if (curRobot.batteryLevel > maxBattery) {
                        closestRobot = curRobot;
                        maxBattery = curRobot.maxBattery
                        minDistance = curDistance
                    }
                } else if (curDistance < minDistance) { //If not, pick the closest
                    closestRobot = curRobot;
                    minDistance = curDistance;
                }
            });

            res.send({
                'robotId': closestRobot.robotId,
                'distanceToGoal' : minDistance,
                'batteryLevel' : closestRobot.batteryLevel
            });
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

        //Q: So, is best the nearest? Or if I have one at 4 and one at 5 distance, I want the 5 but more battery one?

    console.log('POST /api/robots/closest');
   // res.send('Done?');
});

app.listen(port, ()=> {
    console.log(`Example app listening on port ${port}`)
});
