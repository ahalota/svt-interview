import express, { Express, NextFunction, Request, Response } from 'express'
import https from 'https'
import { findClosestRobotAndDistance, LoadInfo } from './robotMethods'

const app: Express = express()
const port: number = 5000
const robotListEndpoints: string[] = ['https://60c8ed887dafc90017ffbd56.mockapi.io/robots', 'https://svtrobotics.free.beeceptor.com/robots']

app.listen(port, () => {
  // TODO: Logging
})

// src:https://javascript.plainenglish.io/typed-express-request-and-response-with-typescript-7277aea028c
// export interface TypedRequestQuery<T extends Query> extends Express.Request { query: T }
// TypedRequestQuery<LoadInfo>

app.post('/api/robots/closest', (req: Request, res: Response, next: NextFunction) => {
  // 1. Check for valid request. If not, send error.
  const loadInfo: LoadInfo = JSON.parse(JSON.stringify(req.query))

  if (isNaN(loadInfo.x)) res.status(400).send('x required.')
  if (isNaN(loadInfo.y)) res.status(400).send('y required.')

  // 2. Get robot list. Go through both if first fails. If both fail, return error message.
  https.get(robotListEndpoints[0], (resp) => {
    let data = ''
    resp.on('data', (chunk: string) => {
      data += chunk
    })

    resp.on('end', () => {
      const robotList = JSON.parse(data)
      const result = findClosestRobotAndDistance(robotList, loadInfo)
      res.status(200).json(result)
    })
  }).on('error', (err) => {
    res.status(400).send(err.message)
  })
})
