class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    handleAddTodo(text) {
        if (text && text.trim()) {
            this.model.addTodo(text);
        }
    }

    handleDeleteTodo(id) {
        this.model.removeTodo(id);
    }
}

module.exports = { Controller };