// src/server.ts
import { app } from "./app";

const sequelize = require('./util/database');

console.log(`Port:${process.env.PORT}`);
const port = process.env.PORT || 3000;

//sync database
sequelize
  .sync()
  .then((result: any) => {
    console.log("Database connected");
    app.listen(port, () =>
      console.log(`Example app listening at http://localhost:${port}`)
    );
  })
  .catch((err: any) => console.log(err));
