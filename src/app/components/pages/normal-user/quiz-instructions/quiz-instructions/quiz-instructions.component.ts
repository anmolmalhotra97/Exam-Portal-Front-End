import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private quizService: QuizService,
    private router: Router
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to start the Quiz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, start it!',
      cancelButtonText: 'No, I will do it later',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/start-quiz', this.quizId]);
      }
    });
  }
}
