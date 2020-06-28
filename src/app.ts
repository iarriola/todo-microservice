import dotenv from 'dotenv';
import express from 'express'
import { Express } from 'express-serve-static-core';
import { logger } from './logger';
import initializeDependencies from './util/initializer';

class App {
  public express: Express;

  constructor () {
    dotenv.config();
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })
    this.express.use('/', router)
  }
}

const port = (process.env.PORT) ? +process.env.PORT : 3000;
const app = new App().express

async function start() {
  await initializeDependencies();
  app.listen(port, () =>
    logger.info({
      message: `Server is running at http://localhost:${port}`,
    }),
  );
}

start();
