import {PostsRepository} from "../repositories/posts-db-repository";
import {
  Pagination, PaginatorCommentViewModel,
  PostsType,
  ReturnTypeObjectComment,
  ReturnTypeObjectPosts, UserAccountDBType,
} from "../types/all_types";


export class PostsService {
  constructor(private postsRepository: PostsRepository) {
    this.postsRepository = postsRepository
  }

  async findPosts(pageNumber: number, pageSize: number, title: string | null): Promise<Pagination>{
    return await this.postsRepository.findPosts(pageNumber, pageSize, title)
  }
  async findPostsByBloggerId(bloggerId: string, pageNumber: number, pageSize: number): Promise<Pagination>{
    return await this.postsRepository.findPostsByBloggerId(bloggerId, pageNumber, pageSize)
  }

  async createPost(title: string, shortDescription: string, content: string, bloggerId: string, addedAt: string): Promise<ReturnTypeObjectPosts> {
    return await this.postsRepository.createPost(title, shortDescription, content, bloggerId, addedAt)
  }

  async createNewCommentByPostId(postId: string, content: string, user: UserAccountDBType): Promise<ReturnTypeObjectComment> {
    return await this.postsRepository.createNewCommentByPostId(postId, content, user)
  }

  async getPostById(id: string, user: UserAccountDBType | null): Promise<PostsType | null >{
    return await this.postsRepository.getPostById(id, user)
  }
  async getCommentsByPostId(postId: string, pageNumber: number, pageSize: number, sortBy: string | null, sortDirection: string | null): Promise<PaginatorCommentViewModel>{
    return await this.postsRepository.getCommentsByPostId(postId, pageNumber, pageSize, sortBy, sortDirection)
  }

  async updatePostById(id: string, title: string, shortDescription: string, content: string, bloggerId: string): Promise<ReturnTypeObjectPosts> {
    return await this.postsRepository.updatePostById(id, title, shortDescription, content, bloggerId)
  }

  async deletedById(id: string): Promise<Boolean> {
    return await this.postsRepository.deletePostById(id)
  }

  async deletedAllPosts(): Promise<Boolean> {
    return await this.postsRepository.deletedAllPosts()
  }

  async changeLikeStatusPost(user: UserAccountDBType, postId: string, likeStatus: string): Promise<Boolean> {
    return await this.postsRepository.changeLikeStatusPost(user, postId, likeStatus)
  }
}