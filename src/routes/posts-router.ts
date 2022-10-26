import {Router} from "express";
import {
  contentValidation,
  postIdParamsValidation,
  inputValidatorMiddleware,
  shortDescriptionValidation,
  titleValidation,
  bloggerIdBodyValidator,
  contentCommentValidation,
  likeStatusValidator,
} from "../middlewares/input-validator-middleware";
import {ioc} from "../IoCContainer";


export const postsRouts = Router({})

postsRouts.get('/',
  ioc.auth.noneStatusRefreshToken,
  ioc.postsController.getAllPosts.bind(ioc.postsController))

  .post('/',
    ioc.auth.basicAuthorization,
    titleValidation, shortDescriptionValidation, contentValidation,
    bloggerIdBodyValidator, inputValidatorMiddleware,
    ioc.postsController.createNewPost.bind(ioc.postsController))

  .get('/:postId',
    ioc.auth.noneStatusRefreshToken,
    postIdParamsValidation,
    inputValidatorMiddleware,
    ioc.postsController.getPostById.bind(ioc.postsController))

  .put('/:postId',
    ioc.auth.basicAuthorization,
    postIdParamsValidation, titleValidation, shortDescriptionValidation,
    contentValidation, bloggerIdBodyValidator,
    inputValidatorMiddleware,
    ioc.postsController.updatePostById.bind(ioc.postsController))

  .delete('/:postId',
    ioc.auth.basicAuthorization,
    postIdParamsValidation,
    inputValidatorMiddleware,
    ioc.postsController.deletePostById.bind(ioc.postsController))

  .delete('/',
    ioc.auth.basicAuthorization,
    ioc.postsController.deleteAllPosts.bind(ioc.postsController))

  .get('/:postId/comments',
    ioc.auth.noneStatusRefreshToken,
    postIdParamsValidation,
    inputValidatorMiddleware,
    ioc.postsController.getCommentsByPostId.bind(ioc.postsController))

  .post('/:postId/comments',
    ioc.auth.authentication,
    contentCommentValidation,
    inputValidatorMiddleware,
    ioc.postsController.createNewCommentByPostId.bind(ioc.postsController))

  .put('/:postId/like-status',
    ioc.auth.authentication,
    postIdParamsValidation,
    likeStatusValidator,
    inputValidatorMiddleware,
    ioc.postsController.likeStatusPostId.bind(ioc.postsController))