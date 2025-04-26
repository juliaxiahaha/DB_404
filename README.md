# Project Deployment Instructions

This document provides necessary information regarding database hosting, app hosting, and detailed steps to deploy and run the project.



## Hosting Information

### a) Database Hosting

- The database is hosted on **DigitalOcean**.

### b) App Hosting

- The application (both frontend and backend) is intended to be deployed on a **Linux-based Virtual Private Server (VPS)** environment, such as **DigitalOcean Droplet** or any Ubuntu 22.04+ server.
- Requirements:
    - Node.js (v18 or above)
    - npm (v9 or above)
    - A process manager like `pm2` (optional, for production)
    - Environment variable setup for database password and JWT secret

## Running code

- **Start both frontend and server at the same time in different terminals**
    - ```git clone <link of the repo>``` to download the repository.
    - ```cd DB_404``` to enter the directory of the project.
    - ```npm install``` to install the necessary packages.
    - ```npm run dev``` to run vite for frontend.
    - Before start the backend, remember to run:
        - ```export DB_PW='<Password included in report>'```
        - ```export JWT_SECRET='<SECRET included in report>'```
    - ```cd backend && node index.js``` to start up backend