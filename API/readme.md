# API

*** This currently doesn't do much but wanted to get the base in. More features incoming including actually adding a database. For the next step, I'm following this [tutorial](https://dev.to/francescoxx/build-a-crud-rest-api-in-javascript-using-nodejs-express-postgres-docker-jkb) while also adhering to some slightly more strict standards and maintaining a flavor that will allow things like tsoa to work. *** 

This will serve as the backend for our climb set tracking app.

## Developer Tools (this will evolve over time)
* VS Code (or at least that's what I prefer)
* Yarn for dependencies
* * To install globally, run the following
```bash
npm install -g yarn
```

## Before starting
* Get the dependencies by running the follow
```bash
yarn install
```
* Typescript is nice and opinionated, so lets lean on it. All files should be *.ts unless absolutely necessary.
* To check your code builds without errors run:
```bash
yarn run build
```
* * Another included feature we have is [tsoa](https://tsoa-community.github.io/docs/), which will generate our routes for us. This will be done automatically when the above command is run, along with compiling our code into the dist folder. All that to say, don't write any route code. Let the package do the work!

## Running the API
* I plan on moving this into a docker container, but for right now it's simply the following in the base folder
```bash
yarn run start
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
