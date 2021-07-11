import { DetailPageComponent } from './detail-page/detail-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListPageComponent },
  { path: ':id', component: DetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
