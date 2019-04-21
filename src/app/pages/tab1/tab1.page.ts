import { Article } from './../../interfaces/interfaces';
import { NoticiasService } from './../../services/noticias.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  noticias: Article[] = [];
  constructor( private noticiasS: NoticiasService) { }

  ngOnInit() {
    /* Pagina Principal */
   this._cargarNoticias();
  }

  loadData( event ) {
    this._cargarNoticias( event );
  }

  _cargarNoticias( event? ) {
    this.noticiasS.getTopHeadLines()
    .subscribe( resp => {
      if ( resp.articles.length === 0 ) {
        if (event) {
          event.target.disabled = true;
          event.target.complete();
        }
        return;
      }
        this.noticias.push(...resp.articles);
      if ( event ) {
        event.target.complete();
      }
    });

  }
}
