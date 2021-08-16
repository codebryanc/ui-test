import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../routing/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { CardComponent } from './components/card/card.component';
import { MenuComponent } from './components/menu/menu.component';
import { ScoreComponent } from './components/score/score.component';
import { VoteComponent } from './components/vote/vote.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ScoreComponent,
    VoteComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
