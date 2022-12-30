import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category-service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  category: any = {
    title: '',
    description: '',
    categoryId: ''
  };

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategoryById(this.activatedRoute.snapshot.paramMap.get('categoryId')).subscribe(
      (category: any) => {
        if (category != null || category != undefined) {
          this.category = category;
        } else {
          Swal.fire('Error', 'Category not found in Database', 'error').then(
            (result: any) => {
              this.router.navigate(['/admin/view-categories']);
              return;
            });
        }
      },
      (error: any) => {
        Swal.fire('Error', 'Error while fetching category', 'error');
        this.router.navigate(['/admin/view-categories']);
        return;
      });
  }

  updateCategory() {
    if (this.category.title == '' || this.category.description == '') {
      Swal.fire('Error', 'Please fill all the fields', 'error');
      return;
    }

    this.categoryService.updateCategory(this.category).subscribe(
      (response: any) => {
        Swal.fire('Success', 'Category updated successfully', 'success');
        this.router.navigate(['/admin/view-categories']);
        return;
      },
      (error: any) => {
        Swal.fire('Error', 'Error while updating category', 'error');
        this.router.navigate(['/admin/view-categories']);
        return;
      });
  }

}
