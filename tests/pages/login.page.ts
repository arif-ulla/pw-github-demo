import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('index.php?route=account/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'E-Mail Address' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}
