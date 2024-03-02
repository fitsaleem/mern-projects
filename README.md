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


# setup database:

install mongoose

use this uri and change username and password with your actual database:

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true`;

# for envirnment varialbe intall .env in root dir

npm i dotenv

# api testing 

for api testing you can use postman api or also you can use Insomnia

# for hashing password use bcrypt.js in Node.js :

npm install bcryptjs

# for handling cookies

npm install cookie-parser

# for deploy you mern app configure some script in root package.json:

"build": "npm install && npm install --prefix frontend && npm run build --prefix backend"




