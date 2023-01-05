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

  timer: any;
  formattedTime: string = '';

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

        this.quizTitle = this.questions[0].quiz.title;

        console.log(this.questions);

        this.timer = this.questions.length * 2 * 60;
        this.startTimer();
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

  submitQuiz() {
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
        this.calculateMarks();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        this.formattedTime = this.getFormattedTime();
      } else {
        this.calculateMarks();
        clearInterval(t);
      }
    }, 1000);
  }

  getFormattedTime() {
    let minutes = Math.floor(this.timer / 60);
    let seconds = this.timer % 60;

    return minutes + " min : " + seconds + " sec";
  }

  calculateMarks() {
    //Call Server to calculate marks
    this.questionService.submitQuiz(this.questions).subscribe(
      (response: any) => {
        this.marksGot = response.marksGot;
        this.correctAnswers = response.correctAnswers;
        this.wrongAnswers = response.wrongAnswers;
        this.attempted = response.attempted;

        Swal.fire({
          title: 'Quiz Submitted',
          text: 'Quiz Submitted Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            this.isSubmitted = true;
          }
        });
      },
      (error: any) => {
        Swal.fire('Error', 'Error while submitting Quiz', 'error');
        console.log(error);
      });
  }
}