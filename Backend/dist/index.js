"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = 4000;
app.use(express_1.default.json());
app.get('/', async (req, res) => {
    res.send("Welcome Santhosh");
});
// GET all users
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});
// POST a new user
app.post('/users', async (req, res) => {
    const newUser = await prisma.user.create({
        data: req.body,
    });
    res.json(newUser);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
