import { expect, test } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { ProductDetailsPage } from './pages/product-details.page';
import { SearchResultsPage } from './pages/search-results.page';
import { StoreHomePage } from './pages/store-home.page';

test('homepage displays featured products', async ({ page }) => {
  const homePage = new StoreHomePage(page);

  await homePage.goto();

  await expect(page).toHaveTitle('Your Store');
  await expect(page.getByRole('heading', { name: 'Featured' })).toBeVisible();
});

test('search returns matching MacBook products', async ({ page }) => {
  const homePage = new StoreHomePage(page);

  await homePage.goto();
  await homePage.searchFor('MacBook');

  await expect(page).toHaveTitle('Search - MacBook');
  await expect(page.getByRole('link', { name: 'MacBook', exact: true }).first()).toBeVisible();
});

test('customer can open product details from search results', async ({ page }) => {
  const homePage = new StoreHomePage(page);
  const searchResultsPage = new SearchResultsPage(page);
  const productDetailsPage = new ProductDetailsPage(page);

  await homePage.goto();
  await homePage.searchFor('MacBook');
  await searchResultsPage.openProduct('MacBook');

  await expect(page).toHaveTitle('MacBook');
  await expect(productDetailsPage.heading('MacBook')).toBeVisible();
  await expect(productDetailsPage.addToCartButton).toBeVisible();
});

test('customer can add a product to the shopping cart', async ({ page }) => {
  const homePage = new StoreHomePage(page);
  const searchResultsPage = new SearchResultsPage(page);
  const productDetailsPage = new ProductDetailsPage(page);

  await homePage.goto();
  await homePage.searchFor('iPhone');
  await searchResultsPage.openProduct('iPhone');
  await productDetailsPage.addToCart();

  await expect(page.getByText(/Success: You have added/)).toContainText('iPhone');
  await expect(page.getByRole('button', { name: /1 item\(s\)/ })).toBeVisible();
});

test('registered customer can log in', async ({ page }) => {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;
  if (!email || !password) {
    test.skip(true, 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD to run the login test.');
    return;
  }

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, password);

  await expect(page).toHaveURL(/route=account\/account/);
  await expect(page.locator('#content').getByRole('heading', { name: 'My Account' })).toBeVisible();
});
