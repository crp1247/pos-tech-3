// Carregando variáveis de ambiente


require("dotenv").config();

import express from "express";
import config from "config";
import cors from "cors";  // Adicione esta linha

const app = express();
app.use(express.json());

// Conectando ao banco de dados
import db from "../config/db";

// Importando rotas
import router from "./routers/router";

// Importando Logger
import Logger from "../config/logger";

// Middlewares
import morganMiddleware from "./middleware/morganMiddleware";

// Usando middlewares
app.use(morganMiddleware);

// Adicione esta linha para habilitar CORS
app.use(cors());

// Usando rotas
app.use("/api/", router);

// Obtendo a porta a partir da configuração
const port = config.get<number>("port");

// Iniciando o servidor
app.listen(port, async () => {
    await db();
    Logger.info(`Aplicação está rodando na porta ${port}`);
});
