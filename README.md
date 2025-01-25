# RESTful API with Node.js and Express

This is a simple RESTful API built using Node.js and Express. It uses a `MOCK_DATA.json` file with 1000 sample user entries for demonstration purposes.

## Features
- View all users in an HTML format.
- View all users as JSON data.
- View a specific user by ID.
- Add a new user (work in progress).
- Update user details (work in progress).
- Delete a user (work in progress).

## Routes

### Base Route:
`http://localhost:3000/`
- Displays a welcome message with a link to the API endpoint for viewing all users.

### View Users (HTML Format):
`GET /users`
- Displays all users in a simple HTML list format, showing their full names and job titles.

### REST API Endpoints:

1. **Get All Users (JSON Format)**  
   - `GET /api/users`  
   - Returns a JSON list of all users.

2. **Get User by ID**  
   - `GET /api/users/:id`  
   - Returns a specific user by their unique `id`.

3. **Add New User (Work in Progress)**  
   - `POST /api/users`  
   - Endpoint for adding a new user (currently under development).

4. **Update User (Work in Progress)**  
   - `PATCH /api/users/:id`  
   - Endpoint for editing a specific user's information (currently under development).

5. **Delete User (Work in Progress)**  
   - `DELETE /api/users/:id`  
   - Endpoint for removing a specific user from the database (currently under development).

## Simple Data Format

Each user object in the database has the following structure:

```bash
{
  "id": 1,
  "first_name": "Kaia",
  "last_name": "Fonzo",
  "email": "kfonzo0@sciencedirect.com",
  "gender": "Female",
  "job_title": "Paralegal"
}
```

