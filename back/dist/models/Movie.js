"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = void 0;
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    title: { type: String },
    rating: { type: Number },
    description: { type: String },
    professor: { type: String },
    categoria: { type: String },
    stars: { type: Array },
    poster: { type: String }
}, {
    timestamps: true,
});
exports.MovieModel = (0, mongoose_1.model)("Movie", movieSchema);
