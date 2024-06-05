import mongoose from "mongoose"

let NameSchema = new mongoose.Schema({
    name: String
})

export let Name = mongoose.model("Name", NameSchema)
