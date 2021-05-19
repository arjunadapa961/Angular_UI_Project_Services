import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from './Ingredient.model';
import { ShoppigListService } from './shoppig-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[]
  private igChanged: Subscription

  constructor(private ShoppigListService: ShoppigListService) { }

  ngOnInit() {
    this.ingredients = this.ShoppigListService.getIngredients()
    this.igChanged = this.ShoppigListService.ingredientsChanged.subscribe((ingredient: Ingredient[]) => {
      this.ingredients = ingredient
    })
  }

  ngOnDestroy() {
    this.igChanged.unsubscribe()
  }

}
