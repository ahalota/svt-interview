export interface RobotInfo {
  robotId: string,
  batteryLevel: number,
  x: number,
  y: number,
};
export interface LoadInfo {
  loadId: string,
  x: number,
  y: number,
};
interface ClosestRobotInfo {
  robotId: string,
  distanceToGoal: number,
  batteryLevel: number,
};

export function findClosestRobotAndDistance (robotList: RobotInfo[], toFind: LoadInfo): ClosestRobotInfo {
  let closestRobot: RobotInfo = robotList[0]; // Dummy value
  let minDistance: number = Number.MAX_VALUE;
  let maxBattery: number = Number.MIN_VALUE;

  robotList.forEach(curRobot => {
    const curDistance = Math.sqrt(
      Math.pow(curRobot.x - toFind.x, 2) +
      Math.pow(curRobot.y - toFind.y, 2)
    );

    // Find closest
    if (curDistance <= 10) { // If within 10 distance, pick the one with the most battery
      if (curRobot.batteryLevel > maxBattery) {
        closestRobot = curRobot;
        maxBattery = curRobot.batteryLevel;
        minDistance = curDistance;
      }
    } else if (curDistance < minDistance) { // If not, pick the closest
      closestRobot = curRobot;
      minDistance = curDistance;
    }
  });

  return {
    robotId: closestRobot.robotId,
    distanceToGoal: minDistance,
    batteryLevel: closestRobot.batteryLevel,
  };
}
