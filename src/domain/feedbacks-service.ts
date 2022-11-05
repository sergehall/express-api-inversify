import {FeedbacksTypeModel, ReturnTypeObjectFeedback} from "../types/all_types";
import {FeedbacksRepository} from "../repositories/feedback-db-repository";


export class FeedbacksService {
  constructor(private feedbacksRepository: FeedbacksRepository) {
    this.feedbacksRepository = feedbacksRepository
  }
  async  allFeedbacks(): Promise<FeedbacksTypeModel> {
    return await this.feedbacksRepository.getAllFeedbacks()
  }
  async sendFeedback(userId: string, comment: string): Promise<ReturnTypeObjectFeedback> {
    return  await this.feedbacksRepository.createFeedback(userId, comment)
  }
}