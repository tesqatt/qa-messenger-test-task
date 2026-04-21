import { test, expect } from '@playwright/test';

const userEmail = process.env.TEST_USER_EMAIL || 'test@example.com';
const userPassword = process.env.TEST_USER_PASSWORD || 'secret';
const roomName = process.env.TEST_ROOM_NAME || 'QA Test Room';
const messageText =
  process.env.TEST_MESSAGE || `Hello from Playwright ${Date.now()}`;

test.describe('Send message flow', () => {
  test('authenticated user can send a text message and see it in the timeline', async ({ page }) => {
    await page.goto('/login');

    const emailOrUsernameInput = page.getByRole('textbox', {
      name: /email|username/i,
    });

    const passwordInput = page.getByLabel(/password/i);

    const loginButton = page.getByRole('button', {
      name: /log in|login|sign in/i,
    });

    await expect(emailOrUsernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeEnabled();

    await emailOrUsernameInput.fill(userEmail);
    await passwordInput.fill(userPassword);
    await loginButton.click();

    const appLoadedIndicator = page
      .getByRole('main')
      .or(page.getByRole('navigation'))
      .or(page.getByText(/rooms|chats|messages/i).first());

    await expect(appLoadedIndicator).toBeVisible({ timeout: 15000 });

    const roomItem = page
      .getByRole('link', { name: new RegExp(roomName, 'i') })
      .or(page.getByRole('button', { name: new RegExp(roomName, 'i') }))
      .or(page.getByText(new RegExp(roomName, 'i')).first());

    await expect(roomItem).toBeVisible({ timeout: 15000 });
    await roomItem.click();

    const roomHeader = page
      .getByRole('heading', { name: new RegExp(roomName, 'i') })
      .or(page.getByText(new RegExp(roomName, 'i')).first());

    await expect(roomHeader).toBeVisible();

    const messageInput = page
      .getByRole('textbox', { name: /message|write a message|composer/i })
      .or(page.getByPlaceholder(/message|write a message/i))
      .or(page.locator('[data-testid="message-composer"]'));

    await expect(messageInput).toBeVisible();
    await messageInput.fill(messageText);

    const sendButton = page
      .getByRole('button', { name: /send/i })
      .or(page.locator('[data-testid="send-message"]'));

    await expect(sendButton).toBeEnabled();
    await sendButton.click();

    const sentMessage = page
      .getByText(messageText, { exact: true })
      .or(
        page
          .locator('[data-testid="timeline-message"]')
          .filter({ hasText: messageText })
      );

    await expect(sentMessage).toBeVisible({ timeout: 15000 });

    await expect(messageInput).toHaveValue('');
  });
});
