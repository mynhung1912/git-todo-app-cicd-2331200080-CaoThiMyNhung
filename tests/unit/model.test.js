const { TodoService } = require('../../js/model');

describe('TodoService Unit Tests', () => {
    let service;

    beforeEach(() => {
        service = new TodoService();
        service.todos = []; 
    });

    test('should add a new todo', () => {
        service.addTodo('Học Jest');
        expect(service.todos).toHaveLength(1);
        expect(service.todos[0].title).toBe('Học Jest');
    });

    test('should toggle the completed state of a todo', () => {
        service.addTodo('Test Toggle');
        const id = service.todos[0].id;
        service.toggleTodoComplete(id);
        expect(service.todos[0].completed).toBe(true);
    });

    test('should remove a todo', () => {
        service.addTodo('Task to remove');
        const id = service.todos[0].id;
        service.removeTodo(id);
        expect(service.todos).toHaveLength(0);
    });
});