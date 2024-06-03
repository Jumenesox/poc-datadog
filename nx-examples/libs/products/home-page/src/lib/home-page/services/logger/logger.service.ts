/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { datadogLogs } from '@datadog/browser-logs';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private initialized = false;
  constructor() {
    datadogLogs.init({
      clientToken: 'pub3ce77f64710011dab66159c9a3bd23df',
      site: 'us3.datadoghq.com',
      forwardErrorsToLogs: false,
      sessionSampleRate: 100,
    });
    this.initialized = true;
  }

  public debug(message: string, context?: { [x: string]: any }): void {
    if (this.initialized) {
      datadogLogs.logger.debug(message, context);
    }
  }

  public info(message: string, context?: { [x: string]: any }): void {
    if (this.initialized) {
      datadogLogs.logger.info(message, context);
    }
  }

  public warn(message: string, context?: { [x: string]: any }): void {
    if (this.initialized) {
      datadogLogs.logger.warn(message, context);
    }
  }

  public error(message: string, context?, error?: Error): void {
    if (this.initialized) {
      console.log(context);
      datadogLogs.logger.error(message, {}, error);
    }
  }
}
