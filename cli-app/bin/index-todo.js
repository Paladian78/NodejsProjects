const program = require("commander");
const todo = require("../commands/todo");

program
    .command("add")
    .description("Add a todo item")
    .action(todo.add)

program
    .command("list")
    .description("List todo items")
    .action(todo.list)

program
    .command("done")
    .description("Mark a todo item as done")
    .action(todo.done)

program
    .command("undone")
    .description("Mark a todo item as undone")
    .action(todo.undone)

program
    .command("delete")
    .description("Delete a todo item")
    .action(todo.delete)

program
    .command("reset")
    .description("Reset todo list")
    .action(todo.reset)
program.parse(process.argv);

if (!process.argv[2]) {
    program.outputHelp();
}