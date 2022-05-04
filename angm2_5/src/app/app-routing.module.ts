import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccueilComponent} from './accueil/accueil.component';
import {AnnonceComponent} from './annonce/annonce.component';
import {NewAnnonceComponent} from './new-annonce/new-annonce.component';
import {CategorieComponent} from './categorie/categorie.component';
import { NewCategorieComponent } from './new-categorie/new-categorie.component';

const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'annonce', component: AnnonceComponent},
  {path: 'new', component: NewAnnonceComponent},
  {path: 'edit/:id', component: NewAnnonceComponent},
  {path: 'categorie', component: CategorieComponent},
  {path: 'categorie/new', component: NewCategorieComponent},
  {path: 'categorie/:id', component: NewCategorieComponent},
  {path: 'categorie/:nom/annonces', component: CategorieComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
