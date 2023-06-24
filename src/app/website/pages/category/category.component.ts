import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"

import { switchMap } from "rxjs/operators"


import { ProductsService } from "../../../services/products.service"

import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  
  categoryId: string | null = null
  products: Product[] = [];
  productId: string | null = null
  limit = 10;
  offset = 0;

  constructor( private route: ActivatedRoute, private productsService: ProductsService) {}
  

  ngOnInit(): void {
    this.route.paramMap
    .pipe(switchMap((params: any) => {
      this.categoryId = params.get("id")
      console.log(this.categoryId)
      if (this.categoryId) {
        return this.productsService.getByCategory(this.categoryId)
      }
      
      return []  
    }))  
    .subscribe((data: any) => {
      this.products = data
    })

    this.route.queryParamMap.subscribe((params: any) => {
      this.productId = params.get("product")
    })
  }
}
