import { Router } from "express";
import { postController } from "../controller/post.controller";
import { upload } from "../../../multer";

const postRouter = Router()

postRouter.post("/criar", upload.single("imagem"), postController.criar);
postRouter.get('/buscar', postController.pegarTodos)
postRouter.get('/buscar/:id', postController.pegarPorId)
postRouter.put('/atualizar/:id', postController.atualizar)
postRouter.delete('/deletar/:id', postController.deletar)

export default postRouter;