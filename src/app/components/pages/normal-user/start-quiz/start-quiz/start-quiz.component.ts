import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { QuizService } from 'src/app/services/quiz-service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  quizId: any = '';
  questions: any = [];
  quizTitle: any = '';

  marksGot = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  attempted = 0;

  isSubmitted = false;

  constructor(
    private locationStrategy: LocationStrategy,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
  ) { }

  ngOnInit(): void {
    this.quizId = this.activatedRoute.snapshot.paramMap.get('quizId');
    this.preventBackButton();
    this.loadAllQuestionsForQuiz();
  }

  loadAllQuestionsForQuiz() {
    this.questionService.getAllQuestionsForQuizForUser(this.quizId).subscribe(
      (questions: any) => {
        this.questions = questions;

        this.questions.forEach((question: any) => {
          question['givenAnswer'] = '';
        });

        this.quizTitle = this.questions[0].quiz.title;

        console.log(this.questions);
      },
      (error: any) => {
        Swal.fire('Error', 'Error while fetching Questions', 'error');
        console.log(error);
      });
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  submitQuiz(arg0: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to submit the Quiz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'No, I will re-check it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questions.forEach((question: any) => {
          if (question.givenAnswer.trim() != '') {
            this.attempted++;
          }
          if (question.givenAnswer == question.answer) {
            this.correctAnswers++;
            this.marksGot += (this.questions[0].quiz.maxMarks / this.questions[0].quiz.numberOfQuestions);
          }
          if (question.givenAnswer != question.answer) {
            this.wrongAnswers++;
          }
        });

        console.log("marksGot: " + this.marksGot + ", correctAnswers: " + this.correctAnswers + ", wrongAnswers: " + this.wrongAnswers + ", attempted: " + this.attempted);
        Swal.fire({
          title: 'Quiz Submitted',
          text: 'You have successfully submitted the Quiz',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            this.isSubmitted = true;
          }
        });
      }
    });
  }
}