let express = require('express')
let bodyParser = require('body-parser')
let expressApp = express()
const fs = require('fs')


expressApp.use(bodyParser.json())

expressApp.get('/', (req, res) => {
    res.send('Hello World!')
})


expressApp.listen(3000, () => {
    console.log('Server is running on port 3000')
})

let todos = []

let todo1 = {
    id: 1,
    text: 'Learn JS',
    completed: false

}

todos.push(todo1)

// Save todo to file sync
function saveTodosSync() {
    fs.writeFileSync('data/todos.json', JSON.stringify(todos, null, 2))
}

expressApp.get('/todos', (req, res) => {
    res.json(todos)
})

// Create todo
expressApp.post('/todo', (req, res) => {
    let todo = req.body
    let sample = {
        id: 1,
        text: "Todo Text", // Required
        completed: false // Optional
    }
    if (!todo.text) {
        res.status(400).json({ error: 'Text is required' })
        return
    }
    if (todo.completed && typeof todo.completed !== 'boolean') {
        res.status(400).json({ error: 'Completed must be a boolean' })
        return
    }
    let obj = {
        id: getNextUniqueRandomId(),
        text: todo.text,
        completed: todo.completed || false
    
    }
    todos.push(obj)
    saveTodosSync()
    res.json(obj)
    console.log(todos)
})

// Get only 1 todo by id
expressApp.get('/todo/:id', (req, res) => {
    let id = req.params.id
    let todo = todos.find(todo => todo.id === parseInt(id))
    if (!todo) {
        res.status(404).json({ error: 'Todo not found' })
        return
    }
    res.json(todo)
})

// TODO: Implement these features:

// Delete
expressApp.delete('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
        res.status(404).json({ error: 'Todo not found' });
        return;
    }
    todos.splice(index, 1);
    saveTodosSync();
    res.json({ message: 'Todo deleted successfully' });
});

// Update
expressApp.put('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
    }

    const { text, completed } = req.body;

    if (text !== undefined) {
        todo.text = text;
    }
    if (completed !== undefined && typeof completed === 'boolean') {
        todo.completed = completed;
    }

    saveTodosSync();
    res.json(todo);
});

// Assign unique id while creating new TODO
function generateRandomId() {
    return Math.floor(Math.random() * 1000000);
}

function isIdUnique(id) {
    return !todos.some(todo => todo.id === id);
}

function getNextUniqueRandomId() {
    let id;
    do {
        id = generateRandomId();
    } while (!isIdUnique(id));
    return id;
}
