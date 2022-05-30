import config from "./env.config"
import { Sequelize } from "sequelize";

const DB_URL = config.DB_URL;

const sequelize = new Sequelize(DB_URL,{
    logging: false
});

export default sequelize;