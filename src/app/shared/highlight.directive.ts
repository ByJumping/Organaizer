import {Directive, ElementRef, HostListener, Input} from "@angular/core";

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  @Input() appHighlight = '';

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
