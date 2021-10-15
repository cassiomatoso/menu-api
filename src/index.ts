/**
 * Módulos Externos Requeridos
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itensRouter } from "./itens/itens.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

/**
 * Variáveis
 */
if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

/**
 *  Configurações
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/menu/itens", itensRouter);
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Ativa server
 */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
