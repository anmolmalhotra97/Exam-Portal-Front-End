import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question-service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  quizTitle: any = '';
  quizId: any = '';
  questions: any = [
    {
      content: '',
      image: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      quiz: {
        quizId: ''
      }
    }
  ];

  constructor(
    private questionService: QuestionService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Get quiz title
    this.quizTitle = this.activateRoute.snapshot.paramMap.get('quizTitle');

    // Get quiz id
    this.quizId = this.activateRoute.snapshot.paramMap.get('quizId');

    //Get all questions for a quiz
    this.questionService.getAllQuestionsForQuiz(this.quizId).subscribe(
      (questions: any) => {
        this.questions = questions;
      },
      (error: any) => {
        Swal.fire('Error', 'Error while fetching questions', 'error').then(
          (result: any) => {
            this.router.navigate(['/admin/view-quizzes']);
            return;
          });
      });
  }

  // Update question
  public updateQuestion(questionId: any) {
    this.router.navigate(['/admin/update-question', questionId]);
  }

  // Delete question
  public deleteQuestion(questionId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this question',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.questionService.deleteQuestion(questionId).subscribe(
          (response: any) => {
            Swal.fire('Deleted!', 'Question has been deleted.', 'success').then(
              (result: any) => {
                this.ngOnInit();
                return;
              });
          },
          (error: any) => {
            Swal.fire('Error', 'Error while deleting question', 'error').then(
              (result: any) => {
                this.ngOnInit();
                return;
              });
          });
      }
    });
  }

  // Add question
  public addQuestion() {
    this.router.navigate(['/admin/add-question', this.activateRoute.snapshot.paramMap.get('quizId')]);
  }
}
