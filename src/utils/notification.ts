import { APIRequestContext } from '@playwright/test';

export class NotificationService {
  private readonly ntfyUrl = 'https://ntfy.sh/aima-notification';

  constructor(private request: APIRequestContext) { }

  async send(message: string): Promise<void> {
    try {
      const response = await this.request.post(this.ntfyUrl, {
        data: message,
        headers: {
          'Content-Type': 'text/plain'
        }
      });

      if (!response.ok()) {
        throw new Error(`HTTP ${response.status()}`);
      }
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  }

  async sendChangeNotification(addedDates: string[], removedDates: string[]): Promise<void> {
    let message = '🚨 AIMA Portal Updated!\n';

    if (addedDates.length > 0) {
      message += `Added dates: ${addedDates.join(', ')}\n`;
    }
    if (removedDates.length > 0) {
      message += `Removed dates: ${removedDates.join(', ')}\n`;
    }

    message += 'Check the portal for details.';

    await this.send(message);
  }

  async sendNoChangeNotification(): Promise<void> {
    const message = '✅ AIMA Portal checked - no changes detected.';
    await this.send(message);
  }
}
