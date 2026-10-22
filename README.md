# Playwright UI tests

This project uses Playwright with TypeScript to test SauceDemo. The website URL is configured in `test-data/env.json`.
Demo account data is stored in `test-data/testdata.json`. It contains public SauceDemo sample credentials, not private secrets.

## Run the login test locally

```bash
npm ci
npx playwright install chromium
npx playwright test
```

## GitHub Actions

The `Login test` workflow in `.github/workflows/playwright-github-actions.yml` runs the login test on every push. It also runs when a pull request receives an approval. For approval runs, it checks out and tests the pull request's latest commit.

The workflow needs no SauceDemo credentials because the test uses SauceDemo's public demo account.
