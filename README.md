# How to run the application

## Prerequisite:

     1- NodeJS
     2- Redis (caching memory) server/cli which should be downloaded, installed, and running here are the steps ![here](https://redis.io/topics/quickstart).
     3- MongoDB and Mongo server which could be found ![here](https://docs.mongodb.com/manual/installation/)

## Steps:

### 1- Install packages for both client and server as following

       ### `npm install`
       ###  `cd client && npm install`

### 2- Database migration and seeding

       ###  `cd ..` navigate back to main server directory
       ###  `node config/seeder -import` //imports data from external api to db

### 3- Start the app

       ### npm run app

# Notes

## Technical:

### you can delete db documents by running the same import command and passing the argument -destroy instead of -import

## None technical:

I extended the sort and filtering functionality a bit.
For the purpose of demonstrating my skills, I focused mainly on building a highly scalable code structure. Here is what I would change if I would do it for the purpose of the task only:

1- Using a json file for customers data instead of a real db
2- avoid caching for the moment
3- Change file structure on the backend by:
Firstly removing the controllers directory and having only the routers,
Secondly, have less abstraction and put some more code in the router functionality itself for example sorting and pagination
4- Also if I had some time I would refactor the caching code a bit.
5- Regarding the frontend I would much prefer to use redux as a state management tool as it's flexible and more scalable. The react context api despite of being powerful does have some issues when it comes to scalability, code readability, abstraction, encapsulation and separation of concern.
