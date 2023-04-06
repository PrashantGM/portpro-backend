### REQUIREMENTS
1. Node v18.x, NPM v8.x
2. MySQL, MongoDB, Apache Cassandra

### STEPS
1. Run `npm install` in your terminal.
2. Add .env file to root directory referencing .env-template .
3. Setup MySQL database.
     - Run 1st script from migration.txt in your terminal to create new database. 
     - Add `config.json` file to `/models/mysql/config` directory referencing `confg.json-template`. (Note: Use same database name from first script.)
     - Run 2nd and 3rd scripts from migration.txt to migrate and seed User table with dummydata. 
      
      ***Mongo and Cassandra databases are automatically created and filled with dummyUser data on first server load.***

4. Run,&ensp;`npm run dev` .

### ROUTES
- /v1/user for MySQL.
- /v2/user for MongoDB.
- /v3/user for CassandraDB.