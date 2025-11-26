const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");
const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json())

app.get('/isRunning', (req, res) => {
    res.send("server is running")
})

app.post("/api/v1/genres", async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    const existingGenre = await prisma.genre.findMany({
        where: { name }
    });
    if (existingGenre.length > 0) {
        return res.status(409).json({ error: "Genre already exists" });
    }
    const newGenre = await prisma.genre.create({
        data: { name }
    })
    res.status(201).json(newGenre)
});

app.get("/api/v1/genres", async (req, res) => {
    const genres = await prisma.genre.findMany();
    res.status(200).json(genres)
});

app.get("/api/v1/genres/:id", async (req, res) => {
    const { id } = req.params;
    const genre = await prisma.genre.findUnique({
        where: { id: Number(id) },
    });
    res.status(200).json(genre);
});

app.patch("/api/v1/genres/:id", async (req, res) => {
    const { id } = req.params;
    const { newid, name } = req.body;
    const updatedGenre = await prisma.genre.update({
        where: { id: Number(id) },
        data: { id: Number(newid), name },
    });
    res.status(200).json(updatedGenre);
});

app.delete("/api/v1/genres/:id", async (req, res) => {
    console.log("Delete genre called");
    const { id } = req.params;
    const deletedGenre = await prisma.genre.delete({
        where: { id: Number(id) },
    });
    res.status(204).json({ message: "Genre deleted successfully" });
});

// app.

app.post("/api/v1/authors", async (req, res) => {
    const { name, dob } = req.body;
    const newAuthor = await prisma.author.create({
        data: { name: name, DOB: new Date(dob) },
    });
    res.status(201).json(newAuthor)
})



app.listen(3005, () => {
    console.log("Server is running on port 3005")
})