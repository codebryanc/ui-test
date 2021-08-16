import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app/components/app/app.component';

const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: '**', pathMatch:'full', redirectTo: '/app' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
