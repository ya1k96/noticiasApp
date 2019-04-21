import { async } from '@angular/core/testing';
import { Article } from 'src/app/interfaces/interfaces';
import { Component, OnInit, Input, Output } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
@Input() item: Article;
@Input() fav = false;
  constructor(private iab: InAppBrowser,
              public actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private storage: DataLocalService ) {
              }

  ngOnInit() {
    console.log(this.fav);
  }
  /* Plugin para abrir en el navegador nativo del dispositivo */
  open() {
    const browser = this.iab.create(this.item.url, '_system');
  }

  async lanzarMenu () {
    const favorito =  {
      text: 'Favorite',
      cssClass: 'action-dark',
      icon: 'heart',
      handler: () => {
        console.log('Favorite clicked');
        this.storage.guardarNoticia( this.item );
      }
    };

    const borrar =  {
      text: 'Delete',
      cssClass: 'action-dark',
      icon: 'trash',
      handler: () => {
        console.log('Delete clicked');
        this.storage.borrarFavorito(this.item);
      }
    };

    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Share',
        cssClass: 'action-dark',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.item.title,
            this.item.source.name,
            '',
            this.item.url
          );
        }
      },
      this.fav ? borrar : favorito,
      {
        text: 'Cancel',
        cssClass: 'action-dark',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
