import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportsComponent } from './sports.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: SportsComponent 
  },
  {
    path: 'event/:id',
    component: EventDetailComponent,
    canActivate: [AuthGuard] // Require authentication for betting on events
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsRoutingModule { }