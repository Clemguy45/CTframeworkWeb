import { Component, OnInit } from '@angular/core';
import { CovidGouvService } from '../covid/covid-gouv.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  hospitalises: number = 0
  reanimation: number = 0
  deces: number = 0
  gueris: number = 0
  nbCas: number = 0
  source: string = "indisponible"
  date: string = "indisponible"

  chargement: boolean = true

  constructor(public coviGouv: CovidGouvService) { }

  ngOnInit(): void {
    this.coviGouv.getCovid().subscribe(
      (res) => {
        let data = res.FranceGlobalLiveData[0]
        this.reanimation = data.reanimation;
        this.hospitalises = data.hospitalises;
        this.deces = data.deces;
        this.gueris = data.gueris;
        this.nbCas = this.hospitalises + this.gueris + this.deces // data.casConfirmes
        this.source = data.source.nom
        this.date = data.date
        this.chargement = false
      },
      (err) => this.chargement = false
    )
  }

}
