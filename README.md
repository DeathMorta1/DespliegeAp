Dependiendo de la version de node del servidor 20< tendras que instalar la libreria dotenv:
npm i dotenv
y tendras que modificar el script de  packagejson

sin dotenv:

"scripts": {
    "start":"node --env-file .env ./index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
  
con dotenv:

"scripts": {
    "start": "node -r dotenv/config ./index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
