import {Router} from "express";
import {
  contentCommentValidation, inputValidatorMiddleware, likeStatusValidator
} from "../middlewares/input-validator-middleware";
import {myContainer} from "../types/container";
import {CommentsController} from "../presentation/commentsController";
import {AuthMiddlewares} from "../middlewares/authMiddlewares";


export const commentsRouter = Router({})

const commentsController = myContainer.resolve<CommentsController>(CommentsController)
const authMiddlewares = myContainer.resolve<AuthMiddlewares>(AuthMiddlewares)

commentsRouter.get('/:commentId',
  authMiddlewares.noneStatusAccessToken,
  commentsController.findCommentByCommentId.bind(commentsController))

  .put('/:commentId',
    authMiddlewares.authenticationAccessToken,
    authMiddlewares.compareCurrentAndCreatorComment,
    contentCommentValidation, inputValidatorMiddleware,
    commentsController.updateCommentsById.bind(commentsController))

  .put('/:commentId/like-status',
    authMiddlewares.authenticationAccessToken,
    likeStatusValidator,
    inputValidatorMiddleware,
    commentsController.likeStatusCommentId.bind(commentsController))

  .delete('/:commentId',
    authMiddlewares.authenticationAccessToken,
    authMiddlewares.compareCurrentAndCreatorComment,
    commentsController.deleteCommentsById.bind(commentsController))