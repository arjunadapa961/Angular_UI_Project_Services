import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../Ingredient.model';
import { ShoppigListService } from '../shoppig-list.service';


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm
  editedIndex: number
  editMode = false
  subscription: Subscription
  editItemIndex: Ingredient

  constructor(private shoppingListServic: ShoppigListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListServic.startEditing.subscribe(
      (index: number) => {
        this.editedIndex = index
        this.editMode = true
        this.editItemIndex = this.shoppingListServic.getIngredientsEditedItem(index)
        this.slForm.setValue(
          {
            name: this.editItemIndex.name,
            amount: this.editItemIndex.amount
          }
        )
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.shoppingListServic.onUpdateIngredients(this.editedIndex, newIngredient)
    } else {
      this.shoppingListServic.onAddIngredients(newIngredient)
    }
    this.editMode = false
    form.reset()
  }

  onClear() {
    this.slForm.reset()
    this.editMode = false
  }

  onDelete() {
    this.onClear()
    this.shoppingListServic.onDeleteIngredients(this.editedIndex)
  }

}
