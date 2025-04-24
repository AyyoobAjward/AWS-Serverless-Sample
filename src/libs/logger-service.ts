import {ILogFormatter, LogData, pinoLambdaDestination} from 'pino-lambda';
import pino from 'pino';

class RapidLogFormatter implements ILogFormatter {
  format(data: LogData): string {
    return `[notification-service]:[${data.level}] ${JSON.stringify(data)}`;
  }
}
const destination = pinoLambdaDestination({
  formatter: new RapidLogFormatter(),
});
export const logger = pino(
  {level: process.env.LOG_LEVEL || 'info'},
  destination
);
