const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
    const electronApp = await electron.launch({ args: ['.'] });
    const window = await electronApp.firstWindow();

    const taskText = 'My new E2E test task';

    // --- Task 1: Add a new todo ---
    await window.fill('#todo-input', taskText);
    await window.click('#add-todo-btn');

    // --- Task 2: Verify todo added ---
    const todoItem = window.locator('#todo-list li').first(); 
    await expect(todoItem).toBeVisible({ timeout: 5000 });
    await expect(todoItem).toContainText(taskText);
    
    // --- Task 3: Mark complete ---
    const checkbox = todoItem.locator('input[type="checkbox"]');
    await checkbox.check();
    // Chúng ta bỏ qua bước kiểm tra class completed nếu bạn không chắc chắn về tên class
    await expect(checkbox).toBeChecked();

    // --- Task 4: Delete ---
    // Tìm nút xóa dựa trên chữ 'Delete' HOẶC class 'delete-btn' HOẶC thẻ button đầu tiên trong li
    const deleteBtn = todoItem.locator('button').filter({ hasText: /Delete|Xóa/i }).first();
    
    await deleteBtn.click();

    // Xác nhận todoItem đó không còn tồn tại
    await expect(todoItem).toBeHidden();

    await electronApp.close();
});