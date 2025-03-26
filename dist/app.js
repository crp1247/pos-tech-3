"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Carregando variáveis de ambiente
process.env.NODE_CONFIG_DIR = __dirname + "/config";
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const cors_1 = __importDefault(require("cors")); // Adicione esta linha
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Conectando ao banco de dados
const db_1 = __importDefault(require("./config/db"));
// Importando rotas
const router_1 = __importDefault(require("./routers/router"));
// Importando Logger
const logger_1 = __importDefault(require("./config/logger"));
// Middlewares
const morganMiddleware_1 = __importDefault(require("./middleware/morganMiddleware"));
// Usando middlewares
app.use(morganMiddleware_1.default);
// Adicione esta linha para habilitar CORS
app.use((0, cors_1.default)());
// Usando rotas
app.use("/api/", router_1.default);
// Obtendo a porta a partir da configuração
const port = config_1.default.get("port");
// Iniciando o servidor
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)();
    logger_1.default.info(`Aplicação está rodando na porta ${port}`);
}));
