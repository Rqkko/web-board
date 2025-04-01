# web-board
Web board web application

## Setup for Development
### 1. Clone the repository
```bash
git clone https://github.com/Rqkko/web-board.git
cd web-board
```

### 2. Setup & Start Backend
#### 2.1 Create `.env` & populate with the following:
```.env
SUPABASE_URL=*REDACTED*
SUPABASE_ANON_KEY=*REDACTED*
PORT=3001
NODE_ENV=development
```
* To obtain supabase credentials, please contact the administrator
#### 2.2 Install Dependencies
```bash
cd server
npm i
```
#### 2.3 Start the Express server
```bash
npm run dev
```
Go to path `localhost:3001/api/docs` for API documentation

### 3. Setup & Start Frontend
#### 3.1 Install Dependencies
```bash
cd ../client
npm i
```
#### 3.2 Start React Client
```bash
npm start
```
Web browser should open automatically, if not, go to `localhost:3000`

## Contribution
### 1. Clone the repository

### 2. Create a new branch (branch from dev branch)
- Make sure to use the following naming convention: 
<br>
`dev-{frontend|backend}-{feature|bugfix}`
- Example: dev-frontend-loginpage

### 3. Make your changes and commit them
- Check your code for errors and make sure to follow the coding conventions

### 4. Open a pull request to the dev branch
- Write a description of your changes before submitting the pull request  
