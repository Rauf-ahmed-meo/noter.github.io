import express from "express"
import mongoose from "mongoose"
import { Name } from "./models/names.js"
const app = express()
const port = 3000

let conn = mongoose.connect("mongodb://localhost:27017/")

app.use(express.json())

app.set("view engine", "ejs")

app.get('/', async (req, res) => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const names = await Name.find().exec();
    res.render("index", { names })
})

app.post("/namestore", (req, res) => {
    const name = new Name({ name: req.body.name })
    name.save().then(() => {
        res.send("name saved")
    })
})

app.delete('/names/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Name.findByIdAndDelete(id);
        res.send('Name deleted successfully!');
    } catch (error) {
        res.status(500).send('Error deleting name');
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})