import express from "express";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middlewares/errorMiddleware";

const app = express();

app.use(express.json());
app.use("/api", userRoutes);


app.use(errorHandler); // Middleware de tratamento de erros, deve ser chamado depois de todas as rotas

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});

export default app;