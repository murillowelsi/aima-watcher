import { test as base } from '@playwright/test';
import { AimaHomePage } from '../pages/aima-home.page';
import { MessageAnalyzer, MessageStorage } from '../utils/message';
import { NotificationService } from '../utils/notification';

type TestFixtures = {
  notificationService: NotificationService;
  messageStorage: MessageStorage;
  messageAnalyzer: MessageAnalyzer;
  aimaHomePage: AimaHomePage;
};

export const test = base.extend<TestFixtures>({
  notificationService: async ({ request }, use) => {
    const notificationService = new NotificationService(request);
    await use(notificationService);
  },

  messageStorage: async ({ }, use) => {
    const messageStorage = new MessageStorage();
    await use(messageStorage);
  },

  messageAnalyzer: async ({ }, use) => {
    const messageAnalyzer = new MessageAnalyzer();
    await use(messageAnalyzer);
  },

  aimaHomePage: async ({ page }, use) => {
    const aimaHomePage = new AimaHomePage(page);
    await use(aimaHomePage);
  },
});

export { expect } from '@playwright/test';
