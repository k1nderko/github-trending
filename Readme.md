Node.js GitHub Sync Service
This is a Node.js service that interacts with the GitHub API to sync trending repositories and provide an API for fetching repository data. It includes a CLI client for interacting with the API.

Requirements:  
Node.js (v14 or later)  
PostgreSQL  
GitHub API Access  

Setup Instructions:

Server Setup:  
Clone the repository:  
git clone <repository_url>  
cd <project_directory>  
Install dependencies:  
npm install  

Configure environment variables. Create a .env file in the root directory and define the following:  
DB_HOST: Database host (e.g., localhost)  
DB_USER: Database username  
DB_PASSWORD: Database password  
DB_NAME: Database name  

Start the server:  
node index.js  
This will start the server on http://localhost:3000.  

API Endpoints  
http://localhost:3000/api-docs/  


Start CLI Client:  
node bot.js  

Available commands:  
get-repositories: Fetch all repositories.  
get-repository <name|githubId>: Get a repository by name or GitHub ID.  
start-sync: Start the sync with GitHub.  
set-sync-interval <interval>: Set a custom sync interval.  
