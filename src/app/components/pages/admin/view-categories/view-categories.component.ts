import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category-service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categoryList: any = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (category: any) => {
        console.log(category);
        this.categoryList = category;
      },
      (error: any) => {
        console.log(error);
        Swal.fire('Error!!', 'Error in Loading Categories Data', 'error');
      }
    );
  }

  public updateCategory(categoryId: any) {
    this.router.navigate(['admin/update-category', categoryId]);
  }

  public deleteCategory(categoryId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action Will delete ALL the quizzes under this category as well.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.categoryService.deleteCategory(categoryId).subscribe(
          (response: any) => {
            console.log(response);
            Swal.fire('Deleted!', 'Category has been deleted.', 'success');
            this.ngOnInit();
          },
          (error: any) => {
            console.log(error);
            Swal.fire('Error!!', 'Error in Deleting Category', 'error');
          }
        );
      }
    });
  }
}
