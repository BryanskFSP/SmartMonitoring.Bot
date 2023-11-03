import 'reflect-metadata';

import dotenv from 'dotenv';

dotenv.config();

import { startBot } from './client';
import {createControllers} from "./rest";
import {createAPI} from "./api";

startBot();
createControllers();
createAPI();

// import './database/data-source';
import './events';
import './commands';
