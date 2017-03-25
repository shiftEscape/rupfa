import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IconComponent } from './icon/icon.component';
import { QuoteIconComponent } from './quote-icon/quote-icon.component';
import { MakesComponent } from './makes/makes.component';
import { ModelsComponent } from './models/models.component';
import { HappyComponent } from './happy/happy.component';
import { SadComponent } from './sad/sad.component';

@NgModule({
  declarations: [
    AppComponent,
    IconComponent,
    QuoteIconComponent,
    MakesComponent,
    ModelsComponent,
    HappyComponent,
    SadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
