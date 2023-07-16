import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from 'url';

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"

import { register } from "./controllers/auth.js"

// CONFIGURATION

// Grabs the file URL and converts it to a path
const __filename = fileURLToPath(import.meta.url);

// Only used when we use type modules
const __dirname = path.dirname(__filename);

// for .env files
dotenv.config();

// for express
const app = express();
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
}));

app.use(morgan("common"));

app.use(bodyParser.json({
    limit: "30mb",
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}));

app.use(cors());

// set the directory for the uploads to the uploaded folder
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "public/assets");
    },
    filename: (request, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// ROUTES WITH FILES

app.post("/auth/register", upload.single("picture"), register);

// ROUTES

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// MONGOOSE SETUP

const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(r => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
}).catch(error => {
    console.log(error.message);
});

