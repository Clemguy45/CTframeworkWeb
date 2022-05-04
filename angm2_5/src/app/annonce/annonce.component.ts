import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnnonceService } from './annonce.service';
import { Annonce } from './annonce';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss']
})
export class AnnonceComponent implements OnInit, OnDestroy {

  annonce: any = {id : 1, nomProduit : 'clavier', description : 'clavier pour ordinateur USB', prix : 20};
  annonces: Annonce[] = [];

  chargement: boolean = true;
  removeMode: boolean = false;
  erreurMessage?: string;
  // @ts-ignore
  annonceSubscription: Subscription;


  constructor(public formBuilder: FormBuilder,
              public annoncesService: AnnonceService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.annonceSubscription = this.annoncesService.getAnnonces()
      .subscribe(
        (res) => {
          this.annonces = JSON.parse(res.annonces);
          this.chargement = false;
        },
        (err) => {
          this.erreurMessage = err.message;
          this.chargement = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.annonceSubscription.unsubscribe();
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
        for (let i = 0; i < this.annonces.length; i++) {
          if (Number(this.annonces[i].id) === Number(id)) {
            index = i;
            break;
          }
        }
        this.annonces.splice(index, 1);
        this.removeMode = false;
      },
      (err) => {
        this.removeMode = false;
        console.error('Échec de la suppression');
      }
    );
  }
}
