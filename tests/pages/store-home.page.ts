import { Page } from '@playwright/test';

export class StoreHomePage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('./');
  }

  async searchFor(productName: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Search' }).fill(productName);
    await this.page.locator('#search').getByRole('button').click();
  }
}
