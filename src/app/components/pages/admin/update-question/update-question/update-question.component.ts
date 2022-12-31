import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question-service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  questionId: any = '';
  quizId: any = '';
  quizTitle: any = '';

  question: any = {
    quesId: '',
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

  constructor(
    private questionService: QuestionService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.questionId = this.activateRoute.snapshot.paramMap.get('quesId');
    this.quizId = this.activateRoute.snapshot.paramMap.get('quizId');
    this.quizTitle = this.activateRoute.snapshot.paramMap.get('quizTitle');
    this.questionService.getQuestionById(this.activateRoute.snapshot.paramMap.get('quesId')).subscribe(
      (question: any) => {
        this.question = question;
      },
      (error: any) => {
        Swal.fire('Error', 'Error while fetching question', 'error').then(
          (result: any) => {
            this.router.navigate(['/admin/view-questions', this.quizId, this.quizTitle]);
            return;
          });
      });
  }

  updateQuestion() {
    if (this.question.content == '' || this.question.content == null || this.question.content == undefined || this.question.content.trim() == '') {
      this.matSnackBar.open('Question content is required', 'OK', {
        duration: 3000
      });
      return;
    }

    if (this.question.option1 == '' || this.question.option1 == null || this.question.option1 == undefined || this.question.option1.trim() == '') {
      this.matSnackBar.open('Option 1 is required', 'OK', {
        duration: 3000
      });

      return;
    }
    if (this.question.option2 == '' || this.question.option2 == null || this.question.option2 == undefined || this.question.option2.trim() == '') {
      this.matSnackBar.open('Option 2 is required', 'OK', {
        duration: 3000
      });
      return;
    }
    if (this.question.option3 == '' || this.question.option3 == null || this.question.option3 == undefined || this.question.option3.trim() == '') {
      this.matSnackBar.open('Option 3 is required', 'OK', {
        duration: 3000
      });
      return;
    }
    if (this.question.option4 == '' || this.question.option4 == null || this.question.option4 == undefined || this.question.option4.trim() == '') {
      this.matSnackBar.open('Option 4 is required', 'OK', {
        duration: 3000
      });
      return;
    }
    if (this.question.answer == '' || this.question.answer == null || this.question.answer == undefined || this.question.answer.trim() == '') {
      this.matSnackBar.open('Answer is required', 'OK', {
        duration: 3000
      });
      return;
    } else if (this.question.answer != this.question.option1 && this.question.answer != this.question.option2 && this.question.answer != this.question.option3 && this.question.answer != this.question.option4) {
      this.matSnackBar.open('Answer must be one of the options', 'OK', {
        duration: 3000
      });
      return;
    }

    this.questionService.updateQuestion(this.question).subscribe(
      (response: any) => {
        Swal.fire('Success', 'Question updated successfully', 'success').then(
          (result: any) => {
            this.router.navigate(['/admin/view-questions', this.quizId, this.quizTitle]);
            return;
          });
      },
      (error: any) => {
        (result: any) => {
          this.router.navigate(['/admin/view-questions', this.quizId, this.quizTitle]);
          return;
        }
      });
  }
}
