1. npm install -g sequelize-cli
2. npm install sequelize tedious
3. npm install express nodemon body-parser dotenv
4. sequelize init

show commandline -> sequelize

5. sequelize db:create
6. sequelize model:generate --name User --attributes email:string,password:string
7. sequelize db:migrate

If changed models or migrations
=> 8. sequelize db:migrate:undo:all
=> 9. sequelize db:migrate

If you want to drop database -> sequelize db:drop

sequelize db:seed:all
