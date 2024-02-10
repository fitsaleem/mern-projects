# mern-projects
In this repo you will get all mern projects with cms


# initilaze the project :
   
   npm install -y 
   npm install express
   npm install nodemon

# changes in pckage.json:

"type": "module",
"scripts": {
    "dev": "nodemon backend/index.js",
    "start": "node backend/index.js",
    "build": "npm install && npm install --prefix frontend && npm run build --prefix backend"
  },

