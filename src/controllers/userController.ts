import { Request as Req, Response as Res, Router } from "express";
import { createConnection } from "../database/connection";

import fs from 'fs';
import path from 'path';
import User from "../entities/User";

const userRepositoryDir: string = path.join(__dirname, '../repositories/usersRepository');

const router = Router();

(async () => {
    const client = await createConnection();

    router.get('/', async (req: Req, res: Res) => {
        const getCotent = fs.readFileSync(path.join(userRepositoryDir, 'get.sql')).toString();
        const usersFromDB = await client.query(getCotent);
        res.send(usersFromDB.rows); 
    });

    router.get('/:id', async (req: Req, res: Res) => {
        const userFromDB = await client.query('SELECT * FROM users where id = $1', [req.params.id]);
        res.send(userFromDB.rows[0] || "Not founded or not exists"); 
    });

    router.post('/', (req: Req, res: Res) => {
        const newUser: User = req.body;
        const insertContent:string = fs.readFileSync(path.join(userRepositoryDir, 'insert.sql')).toString();

        try {  
            client.query(insertContent, [newUser.nome, newUser.email]);
        } catch (error) { 
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }
        return res.status(201).json(newUser); 
    }); 

    router.put('/:id', (req: Req, res: Res) => {
        const user: User = req.body;
        const putContent: string = fs.readFileSync(path.join(userRepositoryDir, 'put.sql')).toString();

        try {
            client.query(putContent, [req.params.id, user.nome, user.email]);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        };
        return res.status(200).json(user);
    });

    router.delete('/:id', (req: Req, res: Res) => {
        const delContent: string = fs.readFileSync(path.join(userRepositoryDir, 'delete.sql')).toString();
        
        try {
            client.query(delContent, [req.params.id]);
        } catch (e) {
            return res.status(500).send(e);
        }
        return res.status(200).send('Resource deleted successfully');
    });
}) ();

export default router;