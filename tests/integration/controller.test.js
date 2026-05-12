/**
 * @jest-environment jsdom
 */
const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

// ... (phần mockView giữ nguyên)

describe('Controller-Service Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        service = TodoService.getInstance(); // Bây giờ lệnh này sẽ hoạt động [cite: 186]
        service.todos = []; 
        controller = new Controller(service, mockView);
    });

    // ... (các bài test handleAddTodo và handleRemoveTodo)
});