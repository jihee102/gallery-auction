import sirv from 'sirv';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

import init from './server/index';
import cors from 'cors';

const app = init();

app // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware()
  )
  .use(cors())
  .listen(PORT, (err) => {
    if (err) console.log('error', err);
  });
