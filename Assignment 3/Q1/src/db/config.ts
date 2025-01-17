import { Sequelize } from "sequelize";

const sequelize=new Sequelize ('weather_db', 'postgres', 'sayalipr' ,{
    host: 'localhost',
    dialect:'postgres'
});


export default sequelize;