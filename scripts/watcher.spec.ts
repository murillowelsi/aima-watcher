import { test } from '../src/fixtures';

test.beforeEach(async ({ aimaHomePage }) => {
  await aimaHomePage.goto();
  await aimaHomePage.verifyWelcomeHeading();
});

test('check landing page messages', async ({ aimaHomePage, notificationService, messageStorage, messageAnalyzer }) => {
  await aimaHomePage.verifyInformationSection();

  const currentMessages = await aimaHomePage.getInformationMessages();

  if (!messageStorage.hasBaseMessage()) {
    messageStorage.saveBaseMessage(currentMessages);
    return;
  }

  const baseMessages = messageStorage.readBaseMessage();

  if (messageAnalyzer.hasChanged(baseMessages, currentMessages)) {
    const { addedDates, removedDates } = messageAnalyzer.analyzeDateChanges(
      baseMessages,
      currentMessages
    );

    await notificationService.sendChangeNotification(addedDates, removedDates);
    messageStorage.updateBaseMessage(currentMessages);
  } else {
    await notificationService.sendNoChangeNotification();
  }
});