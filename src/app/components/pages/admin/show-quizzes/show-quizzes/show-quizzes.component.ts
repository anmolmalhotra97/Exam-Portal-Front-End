import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz-service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-quizzes',
  templateUrl: './show-quizzes.component.html',
  styleUrls: ['./show-quizzes.component.css']
})
export class ShowQuizzesComponent implements OnInit {

  quizzes = [
    {
      quizId: '',
      title: '',
      description: '',
      numberOfQuestions: '',
      maxMarks: '',
      active: '',
      category: {
        title: '',
      }
    }
  ]

  constructor(
    private quizService: QuizService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe(
      (quizzes: any) => {
        console.log(quizzes);
        this.quizzes = quizzes;
      },
      (error: any) => {
        console.log(error);
        Swal.fire('Error', 'Error while fetching quizzes', 'error');
      }
    );
  }

  public deleteQuiz(quizId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this quiz!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.quizService.deleteQuiz(quizId).subscribe(
          (data: any) => {
            console.log(data);
            //There are two ways to update the quizzes list on the page
            //
            // 1. Call the ngOnInit() method again
            // This will fetch the latest quizzes list from the server
            // this.ngOnInit();
            //
            // 2. Filter the quizzes list to remove the deleted quiz
            // This will remove the deleted quiz from the quizzes list, without involving the server again.
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.quizId !== quizId);
            Swal.fire('Success', 'Quiz deleted successfully', 'success');
          },
          (error: any) => {
            console.log(error);
            Swal.fire('Error', 'Error while deleting quiz', 'error');
          }
        );
      }
    });
  }

  public updateQuiz(quizId: any) {
    this.router.navigate([`/admin/update-quiz/${quizId}`]);
  }

  public viewQuizQuestions(quizId: any, quizTitle: any) {
    this.router.navigate([`/admin/view-questions/${quizId}/${quizTitle}`]);
  }

}