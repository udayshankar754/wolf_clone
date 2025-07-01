import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsRoutingModule } from './sports-routing.module';
import { SportsComponent } from './sports.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SportListComponent } from './components/sport-list/sport-list.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { LiveEventsComponent } from './components/live-events/live-events.component';
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';

@NgModule({
  declarations: [
    SportsComponent,
    SportListComponent,
    EventListComponent,
    LiveEventsComponent,
    UpcomingEventsComponent,
    EventDetailComponent
  ],
  imports: [
    CommonModule,
    SportsRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    NgxSkeletonLoaderModule
  ]
})
export class SportsModule { }