import express from "express";
import bearerAutheticationMiddleware from "./middlewares/bearer-authentication.middleware";
import errorHandler from "./middlewares/error_handler.middlewares";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuração de Rotas
app.use(statusRoute);
app.use(authorizationRoute);
app.use(bearerAutheticationMiddleware, usersRoute);

//Configuração de Handler de Erro
app.use(errorHandler);

//Inicializa o Servidor
app.listen(3000, () => {
  console.log("Aplicação executando na porta 3000!");
});
