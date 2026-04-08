import pkg from "pg";

const { Pool } = pkg;

let pool;

export function getPool(){
    if(!pool){
        if(!process.env.DATABASE_URL){
            console.log("DATABASE URL not found", process.env.DATABASE_URL);
            throw new Error("DATABASE_URL is not set");
        }

        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        })
    }

    return pool;
}

export async function checkDB() {
    try{
        await getPool().query("SELECT 1");
        console.log("Database connected");
    } catch(err){
        process.exit(1);
    }
}