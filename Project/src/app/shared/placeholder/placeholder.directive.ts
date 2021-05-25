import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: "[appPlaceHolderDirective]"
})

export class PlaceHolderDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}