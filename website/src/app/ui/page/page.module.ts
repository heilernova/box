import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageContentComponent } from './page-content/page-content.component';
import { PageFooterComponent } from './page-footer/page-footer.component';



@NgModule({
  declarations: [],
  imports: [
    PageComponent,
    PageHeaderComponent,
    PageContentComponent,
    PageFooterComponent
  ],
  exports: [
    PageComponent,
    PageHeaderComponent,
    PageContentComponent,
    PageFooterComponent
  ]
})
export class PageModule { }
