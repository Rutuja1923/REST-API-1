const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();
const PORT = 3000;

//middleware
app.use(express.urlencoded({extended: false}));

//routes
app.get('/',(req,res) => {
    const link = `http://localhost:${PORT}/api/users`;
    res.send(`Hey there! please try <a href='http://localhost:${PORT}/api/users'>http://localhost:${PORT}/api/users</a>`);
});

//to get list of all users
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
//to get all user information
app.get('/api/users',(req,res) => {
    return res.json(users);
});
 

app
    .route('/api/users/:id')
    //to get user information about an user with specified id
    .get((req,res) => {
        const id = Number(req.params.id);
        const user = users.find( (user) =>
            user.id === id
        );
        return res.json(user);
    })
    //to get change a user information -> send data in request body
    .patch((req,res) => {
        const id = Number(req.params.id);
        const body = req.body;

        const userIndex = users.findIndex((user) => 
            user.id === id
        );

        if (userIndex !== -1) {
            users[userIndex] = {...users[userIndex], ...body};

            fs.writeFile('./MOCK_DATA.json', JSON.stringify(users,null,2), (err) => {
                if (err) {
                    return res.status(500).json(
                        {
                            status: 'error',
                            message: 'Failed to update user.'
                        }
                    );
                }
                return res.status(200).json(
                    {
                        status: 'success',
                        message: 'User updated successfully!',
                        userId : id
                    }
                );
            });
        }
        else {
            return res.status(404).json(
                {
                    status: 'error',
                    message: `User with ${id} not found.`
                }
            );    
        }
    })
    // to replace user details -> send data in request body
    .put((req,res) => {
        const id = Number(req.params.id);
        const body = req.body;

        const userIndex = users.findIndex( (user) => 
            user.id === id
        );

        if (userIndex !== -1){

            users[userIndex] = {id, ...body};

            fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    return res.status(500).json(
                        { 
                            message: 'Failed to update user', 
                            error: err.message 
                        }
                    );
                }
                return res.json(
                    {
                        status: 'success',
                        message: 'User replaced successfully',
                        user: id
                    }
                );
            });
        } 
        else {
            return res.status(404).json(
                { 
                    message: `User with ID ${id} not found` 
                }
            );
        }      
    })
    //to delete an user with specified id
    .delete((req,res) => {
        const id = Number(req.params.id);

        const filteredUsers = users.filter( (user) => 
            user.id !== id
        );

        if (filteredUsers.length !== users.length) {
            fs.writeFile('./MOCK_DATA.json', JSON.stringify(filteredUsers, null, 2), (err) => {
                if (err) {
                    return res.status(500).json(
                        {
                            status: 'error',
                            message: 'Failed to delete user.'
                        }
                    );
                }
                return res.status(200).json(
                    {
                        status: 'success',
                        message: 'User deleted successfull'
                    }
                );
            });
        } 
        else {
            return res.status(404).json(
                {
                    status: 'error',
                    message: 'User not found.'
                }
            );
        }
    });   

// to create a new user -> send data in request body
app.post('/api/users',(req,res) => {
    const body = req.body;
    const newUser = {id: users.length+1, ...body};
    users.push(newUser);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file:', err.message);
            return res.status(500).json(
                {
                    status: 'error',
                    message: 'Failed to save user data. Please try again later.'
                }
            );
        }
        return res.status(201).json(
            {
                status: 'success',
                message: 'User added successfully!',
                userId: newUser.id
            }
        );
    }); 
});

app.listen(PORT, () => {
    console.log(`Server stared at http://localhost:${PORT}`)
});