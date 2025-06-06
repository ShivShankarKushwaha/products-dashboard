import { test, expect } from "@playwright/test";

test("Homepage components render correctly", async ({ page }) => {
  await page.goto("https://products-dashboard-xi.vercel.app/");

  await expect(page.getByTestId("navbar")).toBeVisible();
  await expect(page.getByTestId("search-bar")).toBeVisible();
  await expect(page.getByTestId("filter-section")).toBeVisible();
  await expect(page.getByTestId("category-list")).toBeVisible();
  await expect(page.getByTestId("scroll-animation")).toBeVisible();
  await expect(page.getByTestId("products-list")).toBeVisible();
  await expect(page.getByTestId("footer")).toBeVisible();
});

test("Homepage search functionality", async ({ page }) => {
  await page.goto("https://products-dashboard-xi.vercel.app/");

  const searchBar = page.getByTestId("search-bar");
  await searchBar.fill("laptop");
  await searchBar.press("Enter");

  const productsList = page.getByTestId("products-list");
  await expect(productsList).toContainText("laptop");
});

test("Homepage filter functionality", async ({ page }) => {
  await page.goto("https://products-dashboard-xi.vercel.app/");

  const filterSection = page.getByTestId("filter-section");
  await filterSection.click();

  const filterOption = page.getByTestId("filter-option-electronics");
  await filterOption.click();

  const productsList = page.getByTestId("products-list");
  await expect(productsList).toContainText("Electronics");
});

test("Homepage footer links", async ({ page }) => {
  await page.goto("https://products-dashboard-xi.vercel.app/");

  const footer = page.getByTestId("footer");
  const aboutLink = footer.getByText("About Us");
  const contactLink = footer.getByText("Contact");

  await aboutLink.click();
  await expect(page).toHaveURL(/about/);

  await page.goBack();
  await contactLink.click();
  await expect(page).toHaveURL(/contact/);
});

// NOTE: I am currently on fedora, playwright is giving error currently that it doesnt support this OS. SO, i am leaving e2e test code untested.
