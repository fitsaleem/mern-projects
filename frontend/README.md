# Frontend part

# In this project we will use react js and tailwind CSS
# For state managment we will you react redux toolkit
# For pages and routes we will use react-router-dom

([We will use flowbite react UI Libarary](https://www.flowbite-react.com/))

**we will use react icon package for icons**

npm install react-icons --save

# add proxeyon vite.config.js file when you will use fatch api method

server :{
    proxy: {
      '/api' :{
        target: 'http://localhost:3000',
        secure : false,
      },
    },
  },

  