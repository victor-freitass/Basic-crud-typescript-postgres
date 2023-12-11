import { createConnection } from "./connection";
import fs from 'fs';
import path from 'path';

(async () => {

    const client = await createConnection(); 
    const migrationsDir = path.join(__dirname, "migrations"); 
    
    fs.readdir(migrationsDir, (err, files) => {  
        files.forEach(file => {
            fs.readFile(path.join(migrationsDir, file), async (err, content) => {
                await client.query(content.toString());
            }); 
        });
    });

}) ();