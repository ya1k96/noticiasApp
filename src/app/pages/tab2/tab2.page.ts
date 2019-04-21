import { Article } from 'src/app/interfaces/interfaces';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  noticias: Article[] = [];
  loading = false;
 @ViewChild(IonSegment) segment: IonSegment;
  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  constructor( private service: NoticiasService ) { }

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.segmentButtonClicked();
  }

  segmentButtonClicked( event? ) {
    /* Default 'Business' loading ready */
    this.loading = true;
    const categoria = event ? event.target.value : 'business';
    /* Llamada al servicio */
    this.noticias = [];
    this._cargarNoticias(categoria);
    // this.service.getTopHeadLinesCategoria(categoria)
    // .subscribe( resp => {
    //   this.noticias = resp.articles;
    //   this.loading = false;
    // });
  }

  loadData( event ) {
    this.loading = true;
    this._cargarNoticias( this.segment.value, event );
  }

  _cargarNoticias( categoria: string, event? ) {
    this.service.getTopHeadLinesCategoria(categoria)
    .subscribe( resp => {
      this.loading = false;
      if ( resp.articles.length === 0 ) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.noticias.push(...resp.articles);

      if ( event ) {
        event.target.complete();
      }
    });

  }
}