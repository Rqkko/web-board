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
SUPABASE_URL=https://axpqjbtxdkqnijupbqdx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4cHFqYnR4ZGtxbmlqdXBicWR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NTc5MDUsImV4cCI6MjA1ODUzMzkwNX0.B__RkAOaHx75uhpcoxyOrvX-QsLBcmXgUQVrhJImgss
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
