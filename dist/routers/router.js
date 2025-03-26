"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movieControllers_1 = require("../controllers/movieControllers");
const handleValidation_1 = require("../middleware/handleValidation");
const movieValidation_1 = require("../middleware/movieValidation");
const router = (0, express_1.Router)();
router.get("/test", (req, res) => {
    res.status(200).send("API working!");
})
    .post("/movie", (0, movieValidation_1.movieCreateValidation)(), handleValidation_1.validate, movieControllers_1.createMovie)
    .get("/movie/:id", movieControllers_1.findMovieById)
    .get("/movie", movieControllers_1.getAllMovies)
    .delete("/movie/:id", movieControllers_1.removeMovie)
    .patch("/movie/:id", (0, movieValidation_1.movieCreateValidation)(), handleValidation_1.validate, movieControllers_1.updateMovie);
exports.default = router;
