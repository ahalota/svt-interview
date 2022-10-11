import express, { Express, NextFunction, Request, Response } from 'express';
import https from 'https';
import { findClosestRobotAndDistance, LoadInfo } from './robotMethods';

const app: Express = express();
const port: number = 5000;
const robotListEndpoints: string[] = ['https://60c8ed887dafc90017ffbd56.mockapi.io/robots', 'https://svtrobotics.free.beeceptor.com/robots'];

app.listen(port, () => {
  // TODO: Logging
});

app.post('/api/robots/closest', (req: Request, res: Response, next: NextFunction) => {
  // 1. Check for valid request. If not, send error.
  const loadInfo: LoadInfo = JSON.parse(JSON.stringify(req.query));
  if (isNaN(loadInfo.x)) {
    res.status(400).send('x required.'); 
    return;
  }
  if (isNaN(loadInfo.y)) {
    res.status(400).send('y required.'); 
    return;
  }

  // 2. Get robot list. TODO: If first endpoint fails, try the second one
  https.get(robotListEndpoints[0], (resp) => {
    let data = '';
    resp.on('data', (chunk: string) => {
      data += chunk
    });

    resp.on('end', () => {
      const robotList = JSON.parse(data);
      const result = findClosestRobotAndDistance(robotList, loadInfo);
      res.status(200).json(result);
      return;
    });
  }).on('error', (err) => {
    res.status(400).send(err.message);
    return;
  });
});