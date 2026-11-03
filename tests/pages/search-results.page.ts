import { Page } from '@playwright/test';

export class SearchResultsPage {
  constructor(private readonly page: Page) {}

  async openProduct(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName, exact: true }).first().click();
  }
}
