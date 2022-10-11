import { findClosestRobotAndDistance, LoadInfo, RobotInfo } from "../src/robotMethods";

const robotOneOne : RobotInfo = {robotId:"OneOne",x:1,y:1, batteryLevel:1};
const robotOneOneList : Array<RobotInfo> = [robotOneOne];
const loadOneOne: LoadInfo = {loadId:"2",x:1,y:1};
const loadZeroZero: LoadInfo = {loadId: "ZeroZero", x: 0, y: 0};

test('Basic findClosest in list of 1', () => {
    expect(findClosestRobotAndDistance(robotOneOneList, loadOneOne))
    .toEqual({robotId: robotOneOne.robotId ,distanceToGoal:0,batteryLevel: robotOneOne.batteryLevel});
});

test('Calculates proper distance (float)', () => {
    const expectedDistance: number = Math.sqrt(2);
    expect(findClosestRobotAndDistance(robotOneOneList, loadZeroZero))
    .toEqual({robotId: robotOneOne.robotId,distanceToGoal: expectedDistance, batteryLevel: robotOneOne.batteryLevel})
});

test('Picks max battery robot within 10 units', () => {
    const farRobotHighBattery : RobotInfo = {robotId: "farRobotHighBattery", x:-7, y: 7, batteryLevel: 100};
    const nearRobotLowBattery : RobotInfo = {robotId: "nearRobotLowBattery", x: -2, y: 2, batteryLevel: 20};
    const expectedDistance : number = Math.sqrt(
        Math.pow(farRobotHighBattery.x-loadOneOne.x,2) +
        Math.pow(farRobotHighBattery.y-loadOneOne.y,2)
    );
    expect(findClosestRobotAndDistance([farRobotHighBattery,nearRobotLowBattery], loadOneOne))
    .toEqual({robotId: farRobotHighBattery.robotId, distanceToGoal: expectedDistance, batteryLevel: farRobotHighBattery.batteryLevel});
});

test('Picks closest outside of 10 units (ignores battery)', () => {
    const farRobotHighBattery : RobotInfo = {robotId: "farRobotHighBattery", x:100, y: 100, batteryLevel: 100};
    const nearRobotLowBattery : RobotInfo = {robotId: "nearRobotLowBattery", x: -20, y: -20, batteryLevel: 20};
    const expectedDistance : number = Math.sqrt(
        Math.pow(nearRobotLowBattery.x-loadZeroZero.x,2)+
        Math.pow(nearRobotLowBattery.y-loadZeroZero.y,2)
    );
    expect(findClosestRobotAndDistance([farRobotHighBattery,nearRobotLowBattery], loadZeroZero))
    .toEqual({robotId: nearRobotLowBattery.robotId, distanceToGoal: expectedDistance, batteryLevel: nearRobotLowBattery.batteryLevel});
    //Make sure order doesn't matter
    expect(findClosestRobotAndDistance([nearRobotLowBattery,farRobotHighBattery], loadZeroZero))
    .toEqual({robotId: nearRobotLowBattery.robotId, distanceToGoal: expectedDistance, batteryLevel: nearRobotLowBattery.batteryLevel});
});