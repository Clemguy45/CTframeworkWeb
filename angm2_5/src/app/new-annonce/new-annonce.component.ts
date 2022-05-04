import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnnonceService} from '../annonce/annonce.service';
import {Router} from '@angular/router';
import {Annonce} from '../annonce/annonce';
import {ActivatedRoute} from '@angular/router';
import { Categorie } from '../categorie/categorie';
import { CategorieService } from '../categorie/categorie.service';

@Component({
  selector: 'app-new-annonce',
  templateUrl: './new-annonce.component.html',
  styleUrls: ['./new-annonce.component.scss']
})
export class NewAnnonceComponent implements OnInit {

  chargement: boolean = true;
  chargementCat: boolean = true;
  editMode: boolean = false;
  submitLock: boolean = false;
  categories: Categorie[] = []

  userForm: any;
  oldAnnonce: any;

  id : number = -1
  nom: string = ''
  description: string = ''
  prix: string = ''
  categorie: number = -1

  constructor(private formBuilder: FormBuilder,
              private annonceSevice: AnnonceService,
              private categoriesService: CategorieService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.iniForm();
    this.route.paramMap.subscribe(param => {
      this.id = Number(param.get('id'));
      if (this.id) {
        this.annonceSevice.getAnnonceById(this.id).subscribe(
          (res) => {
            this.chargement = false
            this.editMode = true;
            this.oldAnnonce = JSON.parse(res.annonce);
            this.id = this.oldAnnonce.id
            this.nom = this.oldAnnonce.nomProduit
            this.description = this.oldAnnonce.description
            this.prix = this.oldAnnonce.prix
            if(this.oldAnnonce.categorie) {
              this.categorie = this.oldAnnonce.categorie.id
            }
          },
          (err) => console.log("edit mode echec")
        )
      } else {
        this.chargement = false
      }
    });

    this.categoriesService.getCategories().subscribe(
      (res) => {
        this.categories = JSON.parse(res.categories)
        this.chargementCat = false
      }
    )

  }

  private iniForm(): void {
    this.userForm = this.formBuilder.group( {
      nomProduit: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      prix: ['', [Validators.required, Validators.min(0)]],
      categorie: ['', [Validators.required]],
    });
  }

  get getControl(): any {
    return this.userForm.controls;
  }

  submitAnnonce(): void{
    let newAnnonce: Annonce = new Annonce()
    newAnnonce.nomProduit = this.nom
    newAnnonce.prix = this.prix
    newAnnonce.description = this.description
    newAnnonce.categorie = new Categorie()
    newAnnonce.categorie.id = this.categorie
    this.submitLock = true
    if (this.editMode) {
      this.annonceSevice.editAnnonce(this.id, newAnnonce)
      .subscribe(
        (res) => {
          console.log("Edit réussi")
          this.router.navigate(['/annonce'])
        },
        (err) => {
          console.log("Edit echec")
          this.submitLock = false 
        }
      )
    } else {
      this.annonceSevice.addAnnonce(newAnnonce).subscribe(
        (res) => this.router.navigate(['/annonce']),
        (err) => {
          console.log("erreur d'ajout compte")
          this.submitLock = false
        }
      );
    }
  }
}
