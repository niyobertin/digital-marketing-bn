import express from "express";
import cors from "cors"
import { dbconnection } from "./config/db.connection";
import appRoutes from "./routes";
import dotenv from 'dotenv';
dotenv.config();

dbconnection();
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors())
app.use("/api/v1",appRoutes);
app.get('/', (req, res) => {
    res.send('It is good time to brand your dream business!')
  })
  

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  });