# Project Commands

## Installing and setting up TypeORM
```
npm install -g typeorm
typeorm init --name server --database postgres
cd server
```

## Updating the tsconfig.json file
```
npx tsconfig.json
Pick the framework you're using: node
```

## Installing dependencies with yarn and updating the package.json file
```
yarn
yarn upgrade-interactive --latest
```

## Creating a new database
```
createdb [db-name]
```
Update the username, password, and database values in the ormconfig.json file

## Running the server script 
```
yarn start
```

## Setting up the GraphQL server
```
yarn add express apollo-server-express graphql
yarn add -D nodemon
yarn add -D @types/express @types/graphql
```

## Installing type-graphql to define schemas and bcryptjs to hash passwords
```
yarn add type-graphql
yarn add bcryptjs
yarn add -D @types/bcryptjs
```

## Installing jsonwebtoken to generate and validate user access tokens
```
yarn add jsonwebtoken
yarn add -D @types/jsonwebtoken
```

## Enabling Request Cookies
In the settings of the GraphQL interface, change the value of "request.credentials" from "omit" to "include"

## Storing token secrets in environment variables
```
yarn add dotenv
```

## Installing Cookie Parser
```
yarn add cookie-parser
yarn add -D @types/cookie-parser
```

## Creating the front-end React application
```
npx create-react-app client --template typescript
cd client
yarn upgrade-interactive --latest
```

## Installing Apollo server
```
yarn add apollo-boost @apollo/react-hooks graphql
yarn add -D @types/graphql
```

## Installing GraphQL Code Generator and Creating a Hook
```
yarn add -D @graphql-codegen/cli
npx graphql-codegen init
yarn gen
```

## Installing React Router
```
yarn add react-router-dom
yarn add -D @types/react-router-dom
```

## Adding CORS as an Express middlewear
```
yarn add cors
yarn add -D @types/cors
```