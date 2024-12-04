import { DataSource } from "typeorm";

import { User, Student, Spso } from "@/models";

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT || "3306"),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [User, Student, Spso],
    synchronize: true,
});

export async function connectDB() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log("Database connected");
    }
    return AppDataSource;
}