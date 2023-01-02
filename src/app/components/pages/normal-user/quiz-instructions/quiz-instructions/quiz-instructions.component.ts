import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz-service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-instructions',
  templateUrl: './quiz-instructions.component.html',
  styleUrls: ['./quiz-instructions.component.css']
})
export class QuizInstructionsComponent implements OnInit {

  quizId: any = '';
  quiz: any = {};
  constructor(
    private activateRoute: ActivatedRoute,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.quizId = this.activateRoute.snapshot.paramMap.get('quizId');
    this.quizService.getQuizById(this.quizId).subscribe(
      (quizData: any) => {
        this.quiz = quizData;
      },
      (error: any) => {
        Swal.fire('Error', 'Error while fetching Quiz Instructions', 'error');
        console.log(error);
      });
  }

  startQuiz() {

  }
}
