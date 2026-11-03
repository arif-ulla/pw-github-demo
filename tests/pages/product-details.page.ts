import { Page } from '@playwright/test';

export class ProductDetailsPage {
  constructor(private readonly page: Page) {}

  heading(productName: string) {
    return this.page.getByRole('heading', { name: productName, exact: true });
  }

  get addToCartButton() {
    return this.page.getByRole('button', { name: 'Add to Cart', exact: true });
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
