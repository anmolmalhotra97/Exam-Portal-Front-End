import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private httpClient: HttpClient
  ) { }

  // get all quizzes
  public getAllQuizzes() {
    return this.httpClient.get(`${baseUrl}/quiz/`);
  }

  // get quiz by id
  public getQuizById(quizId: any) {
    return this.httpClient.get(`${baseUrl}/quiz/${quizId}`);
  }

  // add new quiz
  public addQuiz(quiz: any) {
    return this.httpClient.post(`${baseUrl}/quiz/`, quiz);
  }

  // update quiz
  public updateQuiz(quiz: any) {
    return this.httpClient.put(`${baseUrl}/quiz/`, quiz);
  }

  // delete quiz
  public deleteQuiz(quizId: any) {
    return this.httpClient.delete(`${baseUrl}/quiz/${quizId}`);
  }

  // get all quizzes by category
  public getAllQuizzesByCategory(categoryId: any) {
    return this.httpClient.get(`${baseUrl}/quiz/category/${categoryId}`);
  }
}
