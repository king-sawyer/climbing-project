# API

This will serve as the backend for our climb set tracking app.

## Developer Tools (this will evolve over time)
* VS Code (or at least that's what I prefer)
* Yarn for dependencies
* * To install globally, run the following
```bash
npm install -g yarn
```
* Sequelize-CLI (primarily for running sequelize migrations)
* * To install globally, run the following
```bash
npm install -g sequelize-cli
```
* pgAdmin4
* * This allows us to take a look at our postgres data and do any kind of db manipulation. In order to connect, use the following:
    "admin" for the user
    "password" for the password
    "localhost" for the host name/address
    "5432" for the port

## Before starting
* Get the dependencies by running the follow
```bash
yarn install
```
* Typescript is nice and opinionated, so lets lean on it. All files should be *.ts unless absolutely necessary.
* * The primary exception to this being migration scripts for the database, which will be .js
* To check your code builds without errors run:
```bash
yarn run build
```
* * Another included feature we have is [tsoa](https://tsoa-community.github.io/docs/), which will generate our routes for us. This will be done automatically when the above command is run, along with compiling our code into the dist folder. All that to say, don't write any route code. Let the package do the work!

## Running the API
* It's in a container! In vs code you should be able to just CTRL + SHIFT + P (on mac COMMAND + SHIFT + P) and select "Docker Compose Up" and everything should start running
* Following getting the containers running, ensure your database has all the appropriate migrations, run the following command at the root of the API project:
```
sequelize db:migrate
```

## Database notes
* Sequelize is an ORM that we'll be using to connect to our Postgres database. There are some articles out there to help make it a little more typescript-y and less javascript-y, so in the future that'll likely be something worth pursuing but for now some of the typescript files might look a bit more like javascript.
* The biggest thing to note here is the migrations. There are two sample migrations currently in the "migrations" folder to get you started. What's most important is that the naming convention follow {dateAndMakeSureIt'sTheNewestOne}-{kebab-case-name-describing-it}. Then for the code it should have this layout:
```
module.exports = {
    up: (queryInterface, Sequelize) => {
      //Your code here
    },
    down: (queryInterface, Sequelize) => {
      //Your code that reverses the above here
    }
  };
```

## Additional Notes
* For `tsoa` to find your controllers, they must be located in the `/src/controllers` directory and have a filename matching `*.controller.ts`
* We are using `inversify` for dependency injection. In order for your controllers to work, they must be decorated with `provideSingleton(<CONTROLLER_CLASS_NAME>)`.
* * If a class has any dependencies, e.g. a controller depending on a service, the dependency should be injected in the constructor, and decorated with @provideSingleton in their definition file. See the following example.

In `user.controller.ts`:
```
import {inject} from 'inversify';
import { provideSingleton } from "../../util/provide-singleton";

//...

@provideSingleton(UserController)
export class UserController extends Controller{ 
    constructor(@inject(UserService) private userService: UserService ){
        super();
    }

    //... 
}
```

In `user-service.ts`:

```
import {provideSingleton} from "../../util/provide-singleton";

// ...

@provideSingleton(UserService)
export class UserService {
    // ...
}
```
