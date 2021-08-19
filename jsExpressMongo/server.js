const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.use(express.json());

const connect = ()=>{

    return mongoose.connect("mongodb://127.0.0.1:27017/findMovies", {
        
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
        
    })

}


const movieSchema = new mongoose.Schema({

    // _id:String,
    movies_name: String,
    movies_genre: String,
    production_year: Number,
    budget: Number

}, {
    versionKey: false
})

const Movie = mongoose.model("movie", movieSchema);


app.get("/movie", async (req, res) => {

    const movie = await Movie.find().lean().exec();

    return res.send(movie);

})

app.post("/movie", async (req, res) => {

    const movie = await Movie.create(req.body);

    return res.send(movie);

})

app.get("/movie/:id", async (req, res) => {

    const movie = await Movie.findById(req.params.id);

    return res.send(movie);

})

app.post("/movie", async (req, res) => {

    const movie = await Movie.create(req.body);

    return res.send(movie);


})

app.patch("/movie/:id", async (req, res) => {

    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    return res.send(movie);


})

app.delete("/movie/:id", async (req, res) => {

    const movie = await Movie.findByIdAndDelete(req.params.id);

    return res.send(movie);

})

app.listen(2555, async () => {
    
    await connect();

    console.log("listening on port 2555");

})