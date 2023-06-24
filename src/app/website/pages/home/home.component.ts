import { Component, OnInit } from '@angular/core';


import { ProductsService } from '../../../services/products.service';


import { Product } from '../../../models/product.model';


import { ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  products: Product[] = [];
  productId: string | null = null
  limit = 10;
  offset = 0;

  constructor(private productsService: ProductsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productsService.getAll(this.limit, this.offset)
    .subscribe((data: any) => {
      this.products = data;
    });
    this.route.queryParamMap.subscribe((params: any) => {
      this.productId = params.get("product")
    })
  }

  loadMore(page: number) {
    this.offset = 10 * page
    this.productsService.getAll(this.limit, this.offset)
    .subscribe((data: any) => {
      this.products = data;
    });
  }

}
