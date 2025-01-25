const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express();
const port = 3000;

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
    //TODO : Create a new User
    return res.json(
        {
            status : 'pending'
        }
    );
});

app.listen(port, () => {
    console.log(`Server stared at http://localhost:${port}`)
});