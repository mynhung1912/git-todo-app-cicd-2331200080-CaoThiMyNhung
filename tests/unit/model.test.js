const { TodoService } = require('../../js/model');

describe('TodoService Unit Tests', () => {
    let service;

    beforeEach(() => {
        service = new TodoService();
        service.todos = []; 
    });

    test('should add a new todo', () => {
        service.addTodo('Học Jest');
        expect(service.todos.length).toBe(1);
        // Kiểm tra xem có chứa chữ 'Học Jest' không (chấp nhận cả title hoặc text)
        const todo = service.todos[0];
        expect(todo.title || todo.text).toBe('Học Jest');
    });

    test('should toggle the completed state of a todo', () => {
        service.addTodo('Test Toggle');
        const id = service.todos[0].id;
        
        // Lưu trạng thái trước khi toggle
        const firstState = service.todos[0].completed;
        service.toggleTodoComplete(id);
        
        // Sau khi toggle phải khác trạng thái ban đầu
        expect(service.todos[0].completed).not.toBe(firstState);
    });

    test('should remove a todo', () => {
        service.addTodo('Task to remove');
        const id = service.todos[0].id;
        
        service.removeTodo(id);
        expect(service.todos.length).toBe(0);
    });
});