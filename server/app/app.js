import express from "express";
import { adminRouter } from "./routes/admin.route.js";
import { usersRouter } from "./routes/users.route.js";
import cors from "cors"

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/admin', adminRouter)
app.use('/users', usersRouter)


export { app };