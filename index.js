const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();
const port = 3000;

//middleware
app.use(express.urlencoded({extended: false}));

//routes
app.get('/',(req,res) => {
    const link = `http://localhost:${port}/api/users`;
    res.send(`Hey there! please try <a href='http://localhost:${port}/api/users'>http://localhost:${port}/api/users</a>`);
});

app.get('/users',(req,res) => {
    const html = 
    `   <ul>
            ${users.map((user) =>
                    `<li>${user.first_name} ${user.last_name} (${user.job_title})</li>`
                ).join('')
            }
        </ul>
    `;
    res.send(html);
});

//REST API routes
app.get('/api/users',(req,res) => {
    return res.json(users);
});
 
app
    .route('/api/users/:id')
    .get((req,res) => {
        const id = Number(req.params.id);
        const user = users.find( (user) =>
            user.id === id
        );
        return res.json(user);
    })
    .patch((req,res) => {
        //TODO : Edit the user with the id
        return res.json(
            {
                status : 'pending'
            }
        );
    })
    .delete((req,res) => {
        //TODO : Delete the user with the id
        return res.json(
            {
                status : 'pending'
            }
        );
    });   

app.post('/api/users',(req,res) => {
    const body = req.body;
    const newUser = {id: users.length+1, ...body};
    users.push(newUser);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file:', err.message);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to save user data. Please try again later.'
            });
        }
        res.status(201).json({
            status: 'success',
            message: 'User added successfully!',
            userId: newUser.id
        });
    }); 
});

app.listen(port, () => {
    console.log(`Server stared at http://localhost:${port}`)
});