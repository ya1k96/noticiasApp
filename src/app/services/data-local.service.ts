import { Article } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
articles: Article[] = [];
  constructor( private storage: Storage, private toastCtrl: ToastController ) {
    this.cargarFavs();
  }

  async presentToast( message? ) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  guardarNoticia( noticia: Article ) {
    const existe = this.articles.find( elem => elem.title === noticia.title);

    if (!existe) {
      this.articles.unshift(noticia);
      this.storage.set('favorito', this.articles);
      this.presentToast('Añadido a favoritos');
    }
  }

  async cargarFavs() {
    this.articles = await this.storage.get('favorito');
  }

  async borrarFavorito( article: Article ) {
    const favs = this.articles.filter( item => item.title !== article.title);
    this.articles = favs;
    this.storage.set('favorito', favs);
    this.presentToast('Borrado correctamente');
  }

}
