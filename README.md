# Sky Stash
Manage your Folders and Files in cloud .

## Features

- User registration with email and password
- User login with email and password
- Token-based authentication using JSON Web Tokens (JWT)
- Refresh token mechanism for enhanced security
- User session management
- Password hashing and salting for data security
- Create and manage Folder
- Create and manage Files

## Todo
- File preview
- File Delete Operation
- Logout
- UI Improvement
- Move File to different folder

## Installation

You can install this project locally by following these steps:

```bash
# Clone the repository
git clone https://github.com/Arbtrage/SkyStash.git
```

```bash
# Navigate to the project directory
cd SkyStash
```

- Run the run.sh file:
```bash
  ./run.sh
```
This script will automatically check if the required modules are installed. If not, it will install them and start the server and client.

Make sure to give the script execute permissions using the following command:
```bash
  chmod +x run.sh
```

Configure .env file from .env.example

## Tech Stack
**Server:**
- Nest.js
- TypeScript
- Prisma (ORM)
- CockroachDb
- FireBase Storage API

**Client**
- NextJs
- TypeScript
- ShadCn


