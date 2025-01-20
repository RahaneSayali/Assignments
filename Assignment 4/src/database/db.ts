import { Sequelize  } from "sequelize";
const db =new Sequelize('postgres' , 'postgres','sayalipr' ,{
    host: 'localhost',               
    dialect: 'postgres',            
    port  : 5484   
    
});

try {
    db.authenticate();
    console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }

    db.sync()
    export default db
