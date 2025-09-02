import { Page, expect } from '@playwright/test';

export class AimaHomePage {
  constructor(private page: Page) { }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async verifyWelcomeHeading(): Promise<void> {
    await expect(
      this.page.getByRole('heading', { name: 'Bem vindo ao Portal de Renovações!' })
    ).toBeVisible();
  }

  async verifyInformationSection(): Promise<void> {
    await expect(
      this.page.getByText('Informações / Atualizações:')
    ).toBeVisible();
  }

  async getInformationMessages(): Promise<string> {
    return await this.page.locator('.t-Region-body ul').innerText();
  }

  getInformationElement() {
    return this.page.locator('.t-Region-body ul');
  }
}
