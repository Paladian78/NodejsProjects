const colors = require('colors');
const { JsonDB, Config } = require('node-json-db');
const db = new JsonDB(new Config("database/db.json", true, false, '/'));
const axios = require("axios");
const chalk = require("chalk");
const boxen = require("boxen");

function user(){
    const mes = `Hello Anonymus!`;
    const greeting = chalk.white.bold(mes);
    const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "#555555"
    };
    const msgBox = boxen( greeting, boxenOptions );
    console.log(msgBox);
}

async function getJoke(){    
    const url = "https://official-joke-api.appspot.com/random_joke";
    const data = await axios.get(url, { headers: { Accept: "application/json" } })
    console.log(colors.bgCyan("\n\nHere is a random joke for you :\n"));
    console.log(colors.magenta('===>>  ' + data.data.setup));
    console.log(colors.bgGreen('****  '+data.data.punchline+'  ****\n\n'));
}

async function add(todo){
    const uid = await db.getData('/id');
    await db.push('/id', uid + 1);
    path = `/todo/${uid}`;
    await db.push(path, {
        "id": uid,
        "todo": todo,
        "done": false
    },false);
    console.log(colors.green(`\nTodo item ${uid} added successfully : `)+ colors.bgYellow(`${todo}`)+ `\n`);
}

async function list(){
    user();
    console.log(colors.yellow("Tasks Pending") + " | " + colors.green("Tasks Done"));
    console.log(colors.blue("######### Todo List #########"));
    const data = await db.getData('/todo');
    for (const todo of Object.values(data)){
        if(todo.done)
            console.log(`${todo.id} -` + colors.green(` ${todo.todo}`));
        else
            console.log(`${todo.id} -` + colors.yellow(` ${todo.todo}`));
    }
    getJoke();
}

async function done(id){
    try{
        const path = `/todo/${id}`;
        const data = await db.getData(path);
        await db.push(`${path}/done`, true);
        console.log(colors.green(`\nTodo item ${id} marked as done : `)+ colors.bgGreen(`${data.todo}` + `\n`));
    }
    catch(error){
        console.log(colors.red("\n####### Error #######"));
        console.log(colors.red(`Todo item ${id} not found\n`));
    }
}

async function undone(id){
    try{
        const path = `/todo/${id}`;
        const data = await db.getData(path);
        await db.push(`${path}/done`, false);
        console.log(colors.green(`\nTodo item ${id} marked as undone : `)+ colors.bgYellow(`${data.todo}`+ `\n`));
    }
    catch(error){
        console.log(colors.red("\n####### Error #######"));
        console.log(colors.red(`Todo item ${id} not found\n`));
    }
}

async function del(id){
    try{
        const path = `/todo/${id}`;
        const data = await db.getData(path);
        await db.delete(path);
        console.log(colors.green(`\nTodo item ${id} deleted : `)+ colors.bgBlue(`${data.todo}`)+ `\n`);
    }
    catch(error){
        console.log(colors.red("\n####### Error #######"));
        console.log(colors.red(`Todo item ${id} not found\n`));
    }
}

async function reset(){
    await db.push('/id', 1);
    await db.push('/todo', {});
    console.log(colors.green("\n***** Todo list reset *****\n"));
}

module.exports = { add, list, done, del, reset , getJoke , user , undone};





