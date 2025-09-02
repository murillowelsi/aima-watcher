import * as fs from 'fs';
import * as path from 'path';

export class MessageStorage {
  private readonly baseMessageFile: string;

  constructor(baseDir: string = __dirname) {
    this.baseMessageFile = path.join(baseDir, '../../base-message.txt');
  }

  hasBaseMessage(): boolean {
    return fs.existsSync(this.baseMessageFile);
  }

  saveBaseMessage(message: string): void {
    fs.writeFileSync(this.baseMessageFile, message, 'utf8');
  }

  readBaseMessage(): string {
    return fs.readFileSync(this.baseMessageFile, 'utf8');
  }

  updateBaseMessage(message: string): void {
    this.saveBaseMessage(message);
  }
}

export class MessageAnalyzer {
  private readonly dateRegex = /\d{1,2} de \w+ de \d{4}/g;

  extractDates(message: string): string[] {
    return message.match(this.dateRegex) || [];
  }

  analyzeDateChanges(baseMessage: string, currentMessage: string): {
    addedDates: string[];
    removedDates: string[];
  } {
    const baseDates = this.extractDates(baseMessage);
    const currentDates = this.extractDates(currentMessage);

    const addedDates = currentDates.filter(date => !baseDates.includes(date));
    const removedDates = baseDates.filter(date => !currentDates.includes(date));

    return { addedDates, removedDates };
  }

  hasChanged(baseMessage: string, currentMessage: string): boolean {
    return baseMessage !== currentMessage;
  }
}
