const inquirer = require("inquirer");
const crud = require("../lib/crud");

const todo = {
    async add() {
        const input = await inquirer.prompt([
            {
                type: "input",
                name: "todo",
                message: "What do you want to do?"
            }
        ]);
        crud.add(input.todo);
    },
    list() {
        crud.list();
    },
    async done() {
        const input = await inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Which todo item do you want to mark as done?"
            }
        ]);
        crud.done(input.id);
    },
    async delete() {
        const input = await inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Which todo item do you want to delete?"
            }
        ]);
        crud.del(input.id);
    },
    reset() {
        crud.reset();
    },
    async undone(){
        const input = await inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Which todo item do you want to mark as undone?"
            }
        ]);
        crud.undone(input.id);
    }

}
module.exports = todo;

