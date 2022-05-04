import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AnnonceComponent } from './annonce/annonce.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewAnnonceComponent } from './new-annonce/new-annonce.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CategorieComponent } from './categorie/categorie.component';
import { NewCategorieComponent } from './new-categorie/new-categorie.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AnnonceComponent,
    NewAnnonceComponent,
    CategorieComponent,
    NewCategorieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
