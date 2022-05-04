import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Categorie} from './categorie';
import {Subscription} from 'rxjs';
import {CategorieService} from './categorie.service';
import { AnnonceService } from '../annonce/annonce.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  categories: Categorie[] = [];
  chargement: boolean = true;
  removeMode: boolean = false;
  erreurMessage?: string;
  // @ts-ignore
  categorieSubscription: Subscription;

  categorieFocus?: Categorie;

  constructor(
    private categorieService: CategorieService, 
    private annoncesService: AnnonceService,
    private router: Router, 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.categorieSubscription = this.categorieService.getCategories()
      .subscribe(
        (res) => {
          this.categories = JSON.parse(res.categories);
          this.chargement = false;
        },
        (err) => {
          this.erreurMessage = err.message;
          this.chargement = false;
        }
      );
  }

  editCategorie(id: any): void {
    this.router.navigate(['categorie/', id])
  }

  deleteCategorie(id: any): void {
    console.log('Suppression de l\'annonce n°' + id);
    this.removeMode = true;
    this.categorieService.deleteCategorie(id).subscribe(
      (res) => {
        let index = -1;
        for (let i = 0; i < this.categories.length; i++) {
          if (Number(this.categories[i].id) === Number(id)) {
            index = i;
            break;
          }
        }
        this.categories.splice(index, 1);
        this.removeMode = false;
      },
      (err) => {
        this.removeMode = false;
        console.error('Échec de la suppression');
      }
    );
  }

  
  editAnnonce(id: any): void {
    this.router.navigate(['edit/', id ]);
  }

  deleteAnnonce(id: any): void {
    console.log('Suppression de l\'annonce n°' + id);
    this.removeMode = true;
    this.annoncesService.deleteAnnonce(id).subscribe(
      (res) => {
        let index = -1;
        if(this.categorieFocus && this.categorieFocus.annonces) {
          for (let i = 0; i < this.categorieFocus.annonces.length; i++) {
            if (Number(this.categorieFocus.annonces[i].id) === Number(id)) {
              index = i;
              break;
            }
          }
          this.categorieFocus.annonces.splice(index, 1);
        }
        this.removeMode = false;
      },
      (err) => {
        this.removeMode = false;
        console.error('Échec de la suppression');
      }
    );
  }
}
