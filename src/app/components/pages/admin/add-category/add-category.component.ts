import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category-service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: any = {
    title: '',
    description: ''
  };

  constructor(
    private matSnackBar: MatSnackBar,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addCategory() {
    // Validates if Title is not empty
    if (this.category.title.trim() === '') {
      this.matSnackBar.open('Title is mandatory !!', 'I will fix it', {
        duration: 3000
      });
      return;
    }

    // Validates if Description is not empty
    if (this.category.description.trim() === '') {
      this.matSnackBar.open('Description is mandatory !!', 'I will Fix it', {
        duration: 3000
      });
      return;
    }

    // Call the service to add the new category
    this.categoryService.addCategory(this.category).subscribe(
      (category: any) => {
        console.log(category);
        Swal.fire('Success', 'Category added successfully', 'success');
        this.router.navigate(['/admin/view-categories']);
      },
      (error: any) => {
        console.log(error);
        Swal.fire('Error', 'Something went wrong', 'error');
      });
  }

}
