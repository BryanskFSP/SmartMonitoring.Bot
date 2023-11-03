import 'reflect-metadata';

import dotenv from 'dotenv';

dotenv.config();

import { startBot } from './client';
import {createControllers} from "./rest";
import {onFiveMinutesCron} from "./events/crons/onFiveMinutes";

startBot();
createControllers();

// import './database/data-source';
import './events';
import './commands';
