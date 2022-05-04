import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../categorie/categorie';
import { CategorieService } from '../categorie/categorie.service';

@Component({
  selector: 'app-new-categorie',
  templateUrl: './new-categorie.component.html',
  styleUrls: ['./new-categorie.component.scss']
})
export class NewCategorieComponent implements OnInit {

  chargement: boolean = true;
  editMode: boolean = false;
  submitLock: boolean = false;

  userForm: any;
  oldCategorie: any;

  id : number = -1
  nom: string = ''

  constructor(private formBuilder: FormBuilder,
    private categoriesService: CategorieService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.iniForm();

    this.route.paramMap.subscribe(param => {
      this.id = Number(param.get('id'));
      if (this.id) {
        this.categoriesService.getCategorieById(this.id).subscribe(
          (res) => {
            this.chargement = false
            this.editMode = true;
            this.oldCategorie = JSON.parse(res.categorie);
            this.id = this.oldCategorie.id
            this.nom = this.oldCategorie.nomCategorie
          },
          (err) => console.log("edit mode echec")
        )
      } else {
        this.chargement = false
      }
    });

  }

  private iniForm(): void {
    this.userForm = this.formBuilder.group( {
      nomCategorie: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get getControl(): any {
    return this.userForm.controls;
  }

  submitCategorie(): void {
    let newCategorie: Categorie = new Categorie()
    newCategorie.nomCategorie = this.nom
    this.submitLock = true

    if(this.editMode) {
      this.categoriesService.editCategorie(this.id, newCategorie)
      .subscribe(
        (res) => {
          console.log("Edit réussi")
          this.router.navigate(['/categorie'])
        },
        (err) => {
          console.log("Edit echec")
          this.submitLock = false 
        }
      )
    } else {
      this.categoriesService.addCategorie(newCategorie)
      .subscribe(
        (res) => {
          this.router.navigate(['/categorie'])
        },
        (err) => {
          this.submitLock = false 
        }
      )
    }
  }

}
