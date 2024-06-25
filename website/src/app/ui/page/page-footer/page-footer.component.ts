import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-footer',
  standalone: true,
  imports: [],
  templateUrl: './page-footer.component.html',
  styleUrl: './page-footer.component.scss'
})
export class PageFooterComponent {
  align = input<'left' | 'center' | 'left'>('left');
}
