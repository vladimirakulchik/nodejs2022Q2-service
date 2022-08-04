import { LoggerService } from '@nestjs/common';
import {
  accessSync,
  constants,
  existsSync,
  mkdirSync,
  Stats,
  statSync,
  writeFileSync,
} from 'fs';
import { EOL } from 'os';
import { join } from 'path';

export class FileLogger implements LoggerService {
  private logsLevel: number;
  private logsDir: string;
  private logsFileName: string;
  private errorsFileName: string;
  private maxFileSize: number;
  private writeErrorsToAnotherFile: boolean;

  constructor(
    logsLevel: number,
    maxFileSize: number,
    logsDir: string,
    logsFileName: string,
    errorsFileName: string,
    writeErrorsToAnotherFile: boolean,
  ) {
    this.logsLevel = logsLevel;
    this.maxFileSize = maxFileSize;

    this.logsDir = this.resolveDirectory(logsDir);
    this.logsFileName = logsFileName;
    this.renameLogsFile();

    this.errorsFileName = errorsFileName;
    this.renameErrorsFile();
    this.writeErrorsToAnotherFile = writeErrorsToAnotherFile;
  }

  log(message: any, ...optionalParams: any[]): void {
    const data: any[] = [this.getDate() + ' [LOG]', message, ...optionalParams];
    this.writeToFile(this.logsFileName, data, this.renameLogsFile);
  }

  error(message: any, ...optionalParams: any[]): void {
    const data: any[] = [
      this.getDate() + ' [ERROR]',
      message,
      ...optionalParams,
    ];
    this.writeToFile(this.logsFileName, data, this.renameLogsFile);

    if (this.writeErrorsToAnotherFile) {
      this.writeToFile(this.errorsFileName, data, this.renameErrorsFile);
    }
  }

  warn(message: any, ...optionalParams: any[]): void {
    const data: any[] = [
      this.getDate() + ' [WARN]',
      message,
      ...optionalParams,
    ];
    this.writeToFile(this.logsFileName, data, this.renameLogsFile);
  }

  debug?(message: any, ...optionalParams: any[]): void {
    const data: any[] = [
      this.getDate() + ' [DEBUG]',
      message,
      ...optionalParams,
    ];
    this.writeToFile(this.logsFileName, data, this.renameLogsFile);
  }

  verbose?(message: any, ...optionalParams: any[]): void {
    const data: any[] = [
      this.getDate() + ' [VERBOSE]',
      message,
      ...optionalParams,
    ];
    this.writeToFile(this.logsFileName, data, this.renameLogsFile);
  }

  private writeToFile(
    filename: string,
    data: any[],
    renameFile: () => string,
  ): void {
    let file: string = filename;

    data.forEach((logItem) => {
      const message = this.convertToString(logItem);

      if (this.shouldCreateNewFile(join(this.logsDir, file), message.length)) {
        file = renameFile();
      }

      this.createDirectory(this.logsDir);
      writeFileSync(join(this.logsDir, file), message, { flag: 'a' });
    });
  }

  private isFileExist(filename: string): boolean {
    try {
      accessSync(filename, constants.R_OK | constants.W_OK);
    } catch (error) {
      return false;
    }

    return true;
  }

  private shouldCreateNewFile(filename: string, extraSize: number): boolean {
    if (!this.isFileExist(filename)) {
      return false;
    }

    const emptySpace: number = this.getEmptySpaceInFile(filename);

    return emptySpace < extraSize;
  }

  private getEmptySpaceInFile(filename: string): number {
    const size: number = this.getFileSize(filename);
    const emptySpace: number = this.maxFileSize - size;

    return emptySpace > 0 ? emptySpace : 0;
  }

  private getFileSize(filename: string): number {
    const stats: Stats = statSync(filename);

    return stats.size;
  }

  private renameLogsFile = (): string => {
    this.logsFileName = this.generateNewFilename(this.logsFileName);

    return this.logsFileName;
  };

  private renameErrorsFile = (): string => {
    this.errorsFileName = this.generateNewFilename(this.errorsFileName);

    return this.errorsFileName;
  };

  private generateNewFilename(filename: string): string {
    const parts: string[] = filename.split('.');
    const index: number = parts.length - 2;
    const previousName: string = parts[index].split('-')[0];

    const newName = previousName + '-' + Date.now();
    parts[index] = newName;

    return parts.join('.');
  }

  private resolveDirectory(directoryName: string): string {
    const path: string = join(__dirname, '../../..', directoryName);
    this.createDirectory(path);

    return path;
  }

  private createDirectory(path: string): void {
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  }

  private getDate(): string {
    const now = new Date();

    return now.toISOString();
  }

  private convertToString(logItem: any): string {
    const text: string =
      typeof logItem === 'string' ? logItem : JSON.stringify(logItem);

    return text + EOL;
  }
}
