import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { DetalheNoticiaPage } from '../detalhe-noticia/detalhe-noticia';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { Storage } from '@ionic/Storage';
import { AngularFireDatabase } from '@angular/fire/database';


@IonicPage()
@Component({
  selector: 'page-novidades',
  templateUrl: 'novidades.html',
})

export class NovidadesPage {

  @ViewChild(Slides) slides: Slides;

  public noticias: any;

  public slidesnew: any;

  public internet: boolean;

  uid: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public servidor: ServidorProvider,
    public http: Http,
    public globalvars: GlobalvarsProvider,
    public storage: Storage,
    public db: AngularFireDatabase,

  ) { 
    this.getRetornarNoticia();
    this.getRetornarSlides();
   }

  //Coleta os dados do bd na tabela noticia pelo noticias.php e coloca em uma array
  getRetornarNoticia() {
    let listnews = this.db.database.ref('/noticias');
    listnews.on('value', (snapshot) =>{
      const items = snapshot.val();
      if(items){
        this.noticias = Object.keys(items).map(i => items[i]);
      }
    })
   
  }

  //Coleta os dados do bd na tabela slide pelo slides.php e coloca em uma array
  getRetornarSlides() {
  
  }


  ionViewDidLoad() {
    this.storage.get('user')
    .then((res) => {
      this.globalvars.setUser(res);
      this.uid = res;
    });
    this.goToSlide();
  }

  slideChanged() {
    this.goToSlide();
  }


  //aqui é a passagem automatico dos slides 
  goToSlide() {
    //Demora de 5 seg para passar de slide e 0,5 de transição
    setTimeout(() => {

      if (this.slides.isEnd()) {
        this.slides.slideTo(0, 500, true);
      } else {
        this.slides.slideNext(500, true);
      }

    }, 5000);
  }


  openDetails(noticia: any) {
    this.navCtrl.push(DetalheNoticiaPage, { cod: noticia });
  }
}