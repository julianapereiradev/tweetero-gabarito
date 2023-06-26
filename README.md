# tweetero-gabarito

- No meu projeto eu não mudei o main no package.json;

- Só coloquei direto no start o nodemon a prof separou entre:

  "scripts": 
{
    "start": "node ./src/app.js",
    "dev": "nodemon ./src/app.js"
  },

o meu estava erra porque eu deixei:

  "scripts": {
    "dev": "nodemon src/app.js"
  },

- Se o seu codigo tá usando aquela biblioteca, coloca como dependencies, mas se nao for coloca como devDependecies (que é o caso do nodemon ) e para ter devDependecies basta baixar como npm i -D nodemon