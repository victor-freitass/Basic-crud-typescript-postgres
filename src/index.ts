import express from 'express';
import "./database/runMigrations";
import routes from './routes';

const app = express();
app.use(express.json());

app.use(routes);

app.listen(process.env.PORT, () => console.log(`Server on, waiting connections...`));