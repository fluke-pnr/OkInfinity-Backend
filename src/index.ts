import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as morgan from "morgan";
import * as cors from "cors";
import routes from "./routes/index"

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();
    const PORT = 8080;
    app.use(compression());
    app.use(morgan("dev"));
    app.use(cors());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({ extended: true }));

    // setup express app here
    // ...
    app.use("/api/v1", routes());
    app.get("/", (_, res) => res.json({ message: "This is Okinfinity api v1" }));

    // start express server
    app.listen(PORT);

    console.log(`Express server has started on port ${PORT}.`);
  })
  .catch((error) => {
    throw error;
  });


// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
