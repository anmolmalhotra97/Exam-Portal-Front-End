import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private httpClient: HttpClient
  ) { }

  // get all questions for a quiz for **ADMIN** (unfiltered, unshuffled)
  public getAllQuestionsForQuiz(quizId: any) {
    return this.httpClient.get(`${baseUrl}/question/quiz/admin/${quizId}`);
  }

  // get all questions for a quiz for **NORMAL USER** (only numberOfQuestions specified by ADMIN)
  public getAllQuestionsForQuizForUser(quizId: any) {
    return this.httpClient.get(`${baseUrl}/question/quiz/${quizId}`);
  }

  // get question by id
  public getQuestionById(questionId: any) {
    return this.httpClient.get(`${baseUrl}/question/${questionId}`);
  }

  // add new question
  public addQuestion(question: any) {
    return this.httpClient.post(`${baseUrl}/question/`, question);
  }

  // update question
  public updateQuestion(question: any) {
    return this.httpClient.put(`${baseUrl}/question/`, question);
  }

  // delete question
  public deleteQuestion(questionId: any) {
    return this.httpClient.delete(`${baseUrl}/question/${questionId}`);
  }

}
