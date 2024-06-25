import { Component } from '@angular/core';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { PageContentComponent } from './page-content/page-content.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    PageHeaderComponent,
    PageFooterComponent,
    PageContentComponent
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {

}
