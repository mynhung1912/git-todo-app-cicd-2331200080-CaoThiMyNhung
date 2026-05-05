# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.js >> End-to-end user workflow
- Location: tests\e2e\app.spec.js:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#todo-list li').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#todo-list li').first()

```

# Test source

```ts
  1  | const { test, expect, _electron: electron } = require('@playwright/test');
  2  | 
  3  | test('End-to-end user workflow', async () => {
  4  |     const electronApp = await electron.launch({ args: ['.'] });
  5  |     const window = await electronApp.firstWindow();
  6  | 
  7  |     const taskText = 'My new E2E test task';
  8  | 
  9  |     // --- Task 1: Add a new todo ---
  10 |     await window.fill('#todo-input', taskText);
  11 |     await window.click('#add-todo-btn');
  12 | 
  13 |     // --- Task 2: Verify todo added ---
  14 |     const todoItem = window.locator('#todo-list li').first(); 
> 15 |     await expect(todoItem).toBeVisible({ timeout: 5000 });
     |                            ^ Error: expect(locator).toBeVisible() failed
  16 |     await expect(todoItem).toContainText(taskText);
  17 |     
  18 |     // --- Task 3: Mark complete ---
  19 |     const checkbox = todoItem.locator('input[type="checkbox"]');
  20 |     await checkbox.check();
  21 |     // Chúng ta bỏ qua bước kiểm tra class completed nếu bạn không chắc chắn về tên class
  22 |     await expect(checkbox).toBeChecked();
  23 | 
  24 |     // --- Task 4: Delete ---
  25 |     // Tìm nút xóa dựa trên chữ 'Delete' HOẶC class 'delete-btn' HOẶC thẻ button đầu tiên trong li
  26 |     const deleteBtn = todoItem.locator('button').filter({ hasText: /Delete|Xóa/i }).first();
  27 |     
  28 |     await deleteBtn.click();
  29 | 
  30 |     // Xác nhận todoItem đó không còn tồn tại
  31 |     await expect(todoItem).toBeHidden();
  32 | 
  33 |     await electronApp.close();
  34 | });
```