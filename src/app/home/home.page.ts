import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Film } from '../models/film';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nom:string='';
  info:string='';
  leProduit:string='';
  produits:string[]= [];
  supprimes:string[]= [];

  image:string='';
  film:string='';
 nomFilm:string='';
 anneeFilm:string ='';
 listFilm:Film[] = [];
 listFavoris:Film[] = [];
constructor(private http:HttpClient) {}

onRecherche(){
  this.listFilm = [];
  let val =this.film;
  let url ='http://www.omdbapi.com/?apikey=efdc2275&s='+val;
  this.film='';
  console.log(url);
  this.http.get<any>(url).subscribe(
    (film)=> { // JSON
      for(let i=0; i<10; i++)
      {
        this.listFilm.push(new Film(film.Search[i].Poster, film.Search[i].Title, film.Search[i].Year, false));
      }        
    }
  );}

  onFavoris(index:number)
  {
    this.listFilm[index].favoris = true;
    this.listFavoris.push(this.listFilm[index]);
  }

  onAffiche()
  {
    console.log(this. nom);
    this.info = this.nom.toUpperCase();
    this.nom='';
  }

  onAfficheFavoris()
  {
    this.listFilm = [];
    this.listFilm = this.listFavoris;
  }

  onAjouter()
  {
    this.produits.push(this.leProduit);
  }

  onSupprimer(idProduit:number, nomProduit:string)
  {
    this.supprimes.push(nomProduit);
    this.produits.splice(idProduit, 1);
  }
}
