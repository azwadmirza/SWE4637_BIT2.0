import express, { Request, Response } from 'express';
import passport from "passport";
import {initialize} from "./config/passport";
import authRoutes from "./route/authentication.route";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import cors from "cors";


const application = express();

initialize();
require("dotenv").config();
application.use(express.json());
application.use(express.urlencoded({ extended: false }));
application.use(morgan("dev"));

const accessStream = fs.createWriteStream(path.join(__dirname,"logs/access.log"), { flags: "a" });
application.use(morgan("combined", { stream: accessStream }));

const corsOptions = {
  origin: [
    "http://localhost:3000",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

application.use(cors(corsOptions));


application.use(passport.initialize());

application.use("/auth", authRoutes);

application.get("/", (req: Request, res: Response) => {
  res.send("Server is alive");
});

export const app=application;
