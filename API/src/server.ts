// src/server.ts
import app from "./app";

const sequelize = require('./util/database');

const port = process.env.PORT || 3000;

//connect to database database
sequelize
  .authenticate()
  .then((result: any) => {
    console.log("Database connected");
    app.listen(port, () =>
      console.log(`Example app listening at http://localhost:${port}`)
    );
  })
  .catch((err: any) => console.log(err));
