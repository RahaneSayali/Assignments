import { Sequelize } from 'sequelize';
import { Pool } from 'pg';
const pool = new Pool({
 user: 'postgres',
 host: 'localhost',
 database: "TestOrder",
 password: "sayalipr", //Change this with your password 
 port: 5432,
});
const sequelize = new Sequelize('TestOrder', 'postgres', 'sayalipr', {
    host: 'localhost',
    dialect: 'postgres',
});

const connection = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("done");
    } catch (error) {
        console.error("unable to connect", error);
    }
};

export { connection };
export default pool;