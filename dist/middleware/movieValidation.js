"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieCreateValidation = void 0;
const express_validator_1 = require("express-validator");
const movieCreateValidation = () => {
    return [
        (0, express_validator_1.body)("title")
            .isString()
            .withMessage("o titulo e obirgatorio")
            .isLength({ min: 5 })
            .withMessage("o titulo tem que ter o minimo 5 caracters"),
        (0, express_validator_1.body)("description").isString().withMessage("a descricao e obrigatoria"),
        (0, express_validator_1.body)("professor").isString().withMessage("escrever o nome do professor e obrigatorio"),
        (0, express_validator_1.body)("poster").isURL().withMessage("a imagem precisa ser uma url "),
        (0, express_validator_1.body)("categoria").isString().withMessage("categoria e obrigatorio")
    ];
};
exports.movieCreateValidation = movieCreateValidation;
