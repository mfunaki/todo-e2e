import { test, expect } from '@playwright/test';

function replaceMablVariables(value: string, variables: Map<string, any>) {
  const regex = /{{@?([^{}]+)}}/g;
  return value.replace(regex, (_match, p1) => {
    const variable = variables.get(p1);
    if (variable) {
      return variable;
    }
    return p1;
  });
}

test('ToDo-E2E - AIアサーション - 各ページの要件', async ({ page, context }) => {
  const variables: Map<string, any> = new Map();
  variables.set('web.defaults.credentials.username', process.env.USERNAME);
  variables.set('web.defaults.credentials.password', process.env.PASSWORD);
  variables.set('web.defaults.url', 'https://todo-skelton-852080299306.asia-northeast1.run.app');
  // Set viewport size to width 1080 and height 1440
  await page.setViewportSize({width: 1080, height: 1440});
  // Visit URL assigned to variable "app.url"
  await page.goto(replaceMablVariables(`{{@web.defaults.url}}`, variables));
  // GenAI Assert: ToDo一覧ページとしての要件を満たしているか検証し、日本語で検証結果を通知。
  // [AssertAIPrompt] step with find type [viewport is not supported for Playwright export :(. Do you need this feature? Create a request in our product portal https://productportal.mabl.com/
  // Click on the link "新規登録ページへ" to https://todo-skelton-85...a-northeast1.run.app/new
  // You can also use the following xpath: '//html[1]/body[1]/div[1]/a[1]' as a fallback
  await page.getByText(`新規登録ページへ`, {exact: true}).first().click();
  // GenAI Assert: ToDo新規登録ページとしての要件を満たしているか検証し、日本語で検証結果を通知。
  // [AssertAIPrompt] step with find type [viewport is not supported for Playwright export :(. Do you need this feature? Create a request in our product portal https://productportal.mabl.com/
  // Click on the link "一覧ページへ戻る" to https://todo-skelton-85...asia-northeast1.run.app/
  // You can also use the following xpath: '//html[1]/body[1]/div[1]/a[1]' as a fallback
  await page.getByText(`一覧ページへ戻る`, {exact: true}).first().click();
  // Click on the link "更新ページへ" to https://todo-skelton-85...-northeast1.run.app/edit
  // You can also use the following xpath: '//html[1]/body[1]/div[1]/a[2]' as a fallback
  await page.getByText(`更新ページへ`, {exact: true}).first().click();
  // GenAI Assert: ToDo更新ページとしての要件を満たしているか検証し、日本語で検証結果を通知。
  // [AssertAIPrompt] step with find type [viewport is not supported for Playwright export :(. Do you need this feature? Create a request in our product portal https://productportal.mabl.com/
  // Click on the link "一覧ページへ戻る" to https://todo-skelton-85...asia-northeast1.run.app/
  // You can also use the following xpath: '//html[1]/body[1]/div[1]/a[1]' as a fallback
  await page.getByText(`一覧ページへ戻る`, {exact: true}).first().click();
  // Click on the link "削除ページへ" to https://todo-skelton-85...ortheast1.run.app/delete
  // You can also use the following xpath: '//html[1]/body[1]/div[1]/a[3]' as a fallback
  await page.getByText(`削除ページへ`, {exact: true}).first().click();
  // GenAI Assert: ToDo削除ページとしての要件を満たしているか検証し、日本語で検証結果を通知。
  // [AssertAIPrompt] step with find type [viewport is not supported for Playwright export :(. Do you need this feature? Create a request in our product portal https://productportal.mabl.com/
  // Click on the link "一覧ページへ戻る" to https://todo-skelton-85...asia-northeast1.run.app/
  // You can also use the following xpath: '//html[1]/body[1]/div[1]/a[1]' as a fallback
  await page.getByText(`一覧ページへ戻る`, {exact: true}).first().click();
});

test('1010 - ToDo - アイテム登録、一覧確認', async ({ page, context }) => {
  const variables: Map<string, any> = new Map();
  variables.set('web.defaults.credentials.username', process.env.USERNAME);
  variables.set('web.defaults.credentials.password', process.env.PASSWORD);
  variables.set('web.defaults.url', 'https://todo-skelton-852080299306.asia-northeast1.run.app');
  // Set viewport size to width 1080 and height 1440
  await page.setViewportSize({width: 1080, height: 1440});
  // Visit URL assigned to variable "app.url"
  await page.goto(replaceMablVariables(`{{@web.defaults.url}}`, variables));
  // Assert "innerText" of the <h1> element with text "📋 ToDo一覧ページ" equals "📋 ToDo一覧ページ"
  // You can also use the following xpath: '//html[1]/body[1]/div[1]/h1[1]' as a fallback
  await expect(page.getByText(`📋 ToDo一覧ページ`, {exact: true}).first()).toHaveText(`📋 ToDo一覧ページ`);
  // Click on the link "＋ 新しいToDoを追加" to https://todo-skelton-85...a-northeast1.run.app/new
  // You can also use the following xpath: '//html[1]/body[1]/div[1]/a[1]' as a fallback
  await page.getByText(`＋ 新しいToDoを追加`, {exact: true}).first().click();
  // Generate a random string with format "mablのお勉強" and assign it to variable "todoItem01"
  variables.set(`todoItem01`, `mablのお勉強`);
  // Insert value of variable "todoItem01" into the "ToDo内容" text field
  // You can also use the following xpath: '//html[1]/body[1]/div[1]/form[1]/div[1]/input[1]' as a fallback
  await page.locator(`id=title`).first().type(replaceMablVariables(`{{@user.todoItem01}}`, variables));
  // Click on the "登録" button
  // You can also use the following xpath: '//html[1]/body[1]/div[1]/form[1]/div[2]/button[1]' as a fallback
  await page.getByText(`登録`, {exact: true}).first().click();
  // Assert "innerText" of the <td> element that meets the selected criteria equals the value of the variable "todoItem01"
  // These selectors are also valid: 'getByText('mablのお勉強')'. But we can't guarantee they will be unique
  await expect(page.locator(`//html[1]/body[1]/div[1]/table[1]/tbody[1]/tr[3]/td[2]`).first()).toHaveText(replaceMablVariables(`{{@user.todoItem01}}`, variables));
});

test('1010 ToDo - 各画面の実装状況', async ({ page, context }) => {
  const variables: Map<string, any> = new Map();
  variables.set('web.defaults.credentials.username', process.env.USERNAME);
  variables.set('web.defaults.credentials.password', process.env.PASSWORD);
  variables.set('web.defaults.url', 'https://todo-skelton-852080299306.asia-northeast1.run.app');
  // Set viewport size to width 1080 and height 1440
  await page.setViewportSize({width: 1080, height: 1440});
  // Visit URL assigned to variable "app.url"
  await page.goto(replaceMablVariables(`{{@web.defaults.url}}`, variables));
  // GenAI Assert: ToDo一覧ページとしての要件を満たしているか検証し、日本語で検証結果を通知。
  // [AssertAIPrompt] step with find type [viewport is not supported for Playwright export :(. Do you need this feature? Create a request in our product portal https://productportal.mabl.com/
  // Click on the link "新規登録ページへ" to https://todo-skelton-85...a-northeast1.run.app/new
  // These selectors are also valid: '.btn.btn-success'. But we can't guarantee they will be unique
  await page.locator(`//html[1]/body[1]/div[1]/a[1]`).first().click();
  // GenAI Assert: ToDo登録ページとしての要件を満たしているか検証し、日本語で検証結果を通知。
  // [AssertAIPrompt] step with find type [viewport is not supported for Playwright export :(. Do you need this feature? Create a request in our product portal https://productportal.mabl.com/
  // Click on the link "一覧ページへ戻る" to https://todo-skelton-85...asia-northeast1.run.app/
  // These selectors are also valid: '.btn.btn-secondary'. But we can't guarantee they will be unique
  await page.locator(`//html[1]/body[1]/div[1]/a[1]`).first().click();
  // Click on the link "更新ページへ" to https://todo-skelton-85...-northeast1.run.app/edit
  // These selectors are also valid: '.btn.btn-warning.ms-2'. But we can't guarantee they will be unique
  await page.locator(`//html[1]/body[1]/div[1]/a[2]`).first().click();
  // GenAI Assert: ToDo更新ページとしての要件を満たしているか検証し、日本語で検証結果を通知。
  // [AssertAIPrompt] step with find type [viewport is not supported for Playwright export :(. Do you need this feature? Create a request in our product portal https://productportal.mabl.com/
  // Click on the link "一覧ページへ戻る" to https://todo-skelton-85...asia-northeast1.run.app/
  // These selectors are also valid: '.btn.btn-secondary'. But we can't guarantee they will be unique
  await page.locator(`//html[1]/body[1]/div[1]/a[1]`).first().click();
  // Click on the link "削除ページへ" to https://todo-skelton-85...ortheast1.run.app/delete
  // These selectors are also valid: '.btn.btn-danger.ms-2'. But we can't guarantee they will be unique
  await page.locator(`//html[1]/body[1]/div[1]/a[3]`).first().click();
  // GenAI Assert: ToDo削除ページとしての要件を満たしているか検証し、日本語で検証結果を通知。
  // [AssertAIPrompt] step with find type [viewport is not supported for Playwright export :(. Do you need this feature? Create a request in our product portal https://productportal.mabl.com/
});
