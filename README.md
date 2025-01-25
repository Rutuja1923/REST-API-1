# RESTful API with Node.js and Express

This is a simple RESTful API built using Node.js and Express. It uses a `MOCK_DATA.json` file with 1000 sample user entries for demonstration purposes.

## Features

- View all users in an HTML format.
- View all users as JSON data.
- View a specific user by ID.
- Add a new user.
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

3. **Add New User**

   - `POST /api/users`
   - Adds a new user to the database.
   - Request Body: Should be sent in `x-www-form-urlencoded` format with the following fields:
     - `first_name`: User's first name (ex : "John")
     - `last_name`: User's last name (ex: "Doe")
     - `email`: User's email address (ex: "john.doe@example.com")
     - `gender`: User's gender (ex: "Male")
     - `job_title`: User's job title (ex: "Software Engineer")
   - **Response:**
     - **On Success:** Returns a `201` status code with a JSON object:
       ```json
       {
         "status": "success",
         "message": "User added successfully!",
         "userId": 1
       }
       ```
     - **On Error:** Returns a `500` status code if there’s an issue saving the data:
       ```json
       {
         "status": "error",
         "message": "Failed to add user."
       }
       ```

4. **Update User**
   - `PATCH /api/users/:id`
   - Endpoint for editing a specific user's information.
   - **Request Parameters:**
     - `:id` - The ID of the user to be updated (passed in the URL).
   - **Request Body:**
     - The fields to be updated, sent in `x-www-form-urlencoded` format. Only the provided fields will be updated; others will remain unchanged.  
        Example:
       ```
          first_name: John
          last_name: Doe
          job_title: Developer
       ```
   - **Response:**
     - **200 OK**
       ```json
       {
         "status": "success",
         "message": "User updated successfully!",
         "userId" : 1
       }
       ```
     - **404 Not Found**
       ```json
       {
         "status": "error",
         "message": "User with the specified ID not found"
       }
       ```

5. **Delete User**
   - `DELETE /api/users/:id`
   - Endpoint for removing a specific user from the database.
   - **Request Parameters:**
     - `:id` - The ID of the user to be deleted (passed in the URL).
   - **Response:**
     - **200 OK**
       ```json
       {
         "status": "success",
         "message": "User deleted successfully"
       }
       ```
     - **404 Not Found**
       ```json
       {
         "status": "error",
         "message": "User with the specified ID not found"
       }
       ```

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

## How to Run the Project

1. **Clone the Repository**  
   Run the following command in your terminal to clone the repository:  
   ```bash
   git clone https://github.com/Rutuja1923/REST-API-1.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd REST-API-1
   ```

3. **Install Dependencies**
   Use the following command to install the required dependencies:

   ```bash
   npm install
   ```

4. **Run the Project**
   You can start the project using one of the following commands:

   - For a one-time run:
   ```bash
   npm start
   ```

   - For development mode with live-reloading:
   ```bash
   npm run dev
   ```

5. **Access the API**
   Once the server starts, you can access the API at:
   ```bash
   http://localhost:3000
   ```
   Make sure to use an API testing tool like Postman to send requests.

Feel free to open issues or contribute to the repository! 😊