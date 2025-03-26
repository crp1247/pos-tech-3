import {body} from "express-validator";

export const movieCreateValidation = () => {
    return[
        body("title")
            .isString()
            .withMessage("o titulo e obirgatorio e")
            .isLength({ min: 5})
            .withMessage("o titulo tem que ter o minimo 5 caracters"),
        body("description").isString().withMessage("a descricao e obrigatoria"),
        body("professor").isString().withMessage("escrever o nome do professor e obrigatorio"),
        body("poster").isURL().withMessage("a imagem precisa ser uma url "), 
         body("categoria").isString().withMessage("categoria e obrigatorio")
    ];
};