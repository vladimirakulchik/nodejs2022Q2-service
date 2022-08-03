import { LoggerService } from '@nestjs/common';
import { existsSync, mkdirSync, statSync, writeFileSync } from 'fs';
import { EOL } from 'os';
import { join } from 'path';

export class FileLogger implements LoggerService {
  private logsLevel: number;
  private logsDir: string;
  private logsFileName: string;
  private errorsFileName: string;
  private maxFileSize: number;

  constructor(
    logsLevel: number,
    logsDir?: string,
    logsFileName?: string,
    errorsFileName?: string,
    maxFileSize?: number,
  ) {
    this.logsLevel = logsLevel;
    this.logsDir = this.resolveDirectory(logsDir);
    this.logsFileName = logsFileName;
    this.errorsFileName = errorsFileName;
    this.maxFileSize = maxFileSize;
  }

  log(message: any, ...optionalParams: any[]): void {
    const data: any[] = ['[LOG]', message, ...optionalParams];
    this.writeToFile(this.logsFileName, data, this.renameLogsFile);
  }

  error(message: any, ...optionalParams: any[]): void {
    const data: any[] = ['[ERROR]', message, ...optionalParams];
    this.writeToFile(this.logsFileName, data, this.renameLogsFile);
    this.writeToFile(this.errorsFileName, data, this.renameErrorsFile);
  }

  warn(message: any, ...optionalParams: any[]): void {
    const data: any[] = ['[WARN]', message, ...optionalParams];
    this.writeToFile(this.logsFileName, data, this.renameLogsFile);
  }

  debug?(message: any, ...optionalParams: any[]): void {
    const data: any[] = ['[DEBUG]', message, ...optionalParams];
    this.writeToFile(this.logsFileName, data, this.renameLogsFile);
  }

  verbose?(message: any, ...optionalParams: any[]): void {
    const data: any[] = ['[VERBOSE]', message, ...optionalParams];
    this.writeToFile(this.logsFileName, data, this.renameLogsFile);
  }

  private resolveDirectory(directoryName: string): string {
    const path: string = join(__dirname, '../../..', directoryName);

    if (!existsSync(directoryName)) {
      mkdirSync(directoryName, { recursive: true });
    }

    return path;
  }

  private writeToFile(
    filename: string,
    data: any[],
    renameFile: () => string,
  ): void {
    data.forEach((item) => {
      let file: string = filename;
      const text: string =
        typeof item === 'string' ? item : JSON.stringify(item);
      const message = text + EOL;

      // if (!this.isEnoughSpace(filename, message.length)) {
      //   file = renameFile();
      // }

      const filepath: string = join(this.logsDir, file);
      writeFileSync(filepath, message, { flag: 'a' });
    });
  }

  private isEnoughSpace(filename: string, extraSize: number): boolean {
    const emptySpace = this.getEmptySpaceInFile(filename);

    return emptySpace >= extraSize;
  }

  private getEmptySpaceInFile(filename: string): number {
    const size = this.getFileSize(filename);

    return this.maxFileSize - size;
  }

  private getFileSize(filename: string): number {
    const stats = statSync(filename);

    return stats.size;
  }

  private renameLogsFile(): string {
    this.logsFileName = this.generateNewFilename(this.logsFileName);

    return this.logsFileName;
  }

  private renameErrorsFile(): string {
    this.errorsFileName = this.generateNewFilename(this.errorsFileName);

    return this.errorsFileName;
  }

  private generateNewFilename(filename: string): string {
    const parts: string[] = filename.split('.');
    const index: number = parts.length - 2;
    const previousName: string = parts[index].split('-')[0];

    const newName = previousName + '-' + Date.now();
    parts[index] = newName;

    return parts.join('.');
  }
}
