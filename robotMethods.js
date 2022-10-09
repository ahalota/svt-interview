//export src: https://stackoverflow.com/questions/62488898/node-js-syntaxerror-cannot-use-import-statement-outside-a-module#answer-62489064
module.exports.findClosestRobotAndDistance = function(robotList, toFind) {
    robotList.forEach(curRobot => {
        let closestRobot;
        let minDistance = Number.MAX_VALUE;
        let maxBattery = Number.MIN_VALUE;
        
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
}
