# web-board
Web board web application

## Setup for Development (I will make a full tutorial later)
### 1. Clone the repository
```bash
git clone https://github.com/Rqkko/web-board.git
cd web-board
```

### 2. Setup & Start Backend
#### 2.1 Create .env & populate with the following:
```.env
SUPABASE_URL=*REDACTED*
SUPABASE_ANON_KEY=*REDACTED*
PORT=3001
NODE_ENV=development
```
#### 2.2 Install Dependencies
```bash
cd server
npm i
```
#### 2.3 Start the Express server
```bash
npm run dev
```
Go to path `localhost:3001/api-docs` for API documentation

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
