import {
    Connection,
    ConnectionOptions,
    getConnectionManager
} from "typeorm";

import { User, Student, Spso } from "@/models";


let connection: Connection | null = null;

export const connectDB = async () => {
    const connectionManager = getConnectionManager();

    if (connectionManager.has("default")) {
        connection = connectionManager.get("default");
    } else {
        connection = connectionManager.create({
            type: "mysql",
            host: process.env.MYSQL_HOST || "localhost",
            port: Number(process.env.MYSQL_PORT) || 3306,
            username: process.env.MYSQL_USER || "root",
            password: process.env.MYSQL_PASSWORD || "",
            database: process.env.MYSQL_DATABASE || "nextjs_db",
            synchronize: true,
            logging: false,
            entities: [User, Student, Spso],
        } as ConnectionOptions);

        await connection.connect();
        console.log("Database connected");
    }
};

export const getConnection = () => {
    return connection;
}
