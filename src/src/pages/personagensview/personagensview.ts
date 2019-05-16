import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-personagensview',
  templateUrl: 'personagensview.html',
})


export class PersonagensviewPage {

  personagens: Array<Object> = [];

  tabs: any = [];

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;

  SwipedTabsIndicator: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {


    this.tabs = ['md-snow', 'md-moon', 'md-leaf', 'md-rose', 'md-cog', 'md-planet', 'md-speedometer', 'md-bulb', 'md-magnet'];

    this.personagens = [
      {
        'nome': 'Estrela Fria',
        'imagem':'../../assets/personagens/Estrela.jpg',
        'descricao': '',
        'poderes': 'Abaixar a temperatura, congelar o ar, manipular o gelo',
        'armas': '',
        'caracteristicas': '',
      },
      {
        'nome': 'Samurai Lunar',
        'imagem':'../../assets/personagens/Samurai.jpg',
        'descricao': 'Antes de se torna o Samurai Lunar, Hayato akemi era o maior assassino da Yakuza tendo até o posto de comandante da divisão de assassinos, porém ele cai em uma armadilha levando a perder membros do seu corpo, mas com ajuda do Destino ele consegue sobreviver e com agora próteses Robóticas no lugar de seus membros ele luta contra essa organização que um dia ele fez parte e busca descobrir que ele realmente é.',
        'poderes': '',
        'armas': '',
        'caracteristicas': '',
      },
      {
        'nome': 'Coruja Prateada',
        'imagem':'../../assets/personagens/Coruja.jpg',
        'descricao': 'Emily Argyle uma renomada pesquisadora que sofre um terrível acidente, que deixa ela incapacitada nos olhos da sociedade, com toda sua vontade, as pessoas verão como uma mulher pode cair muitas vezes e continuar caminhando com seu espirito inabalável.',
        'poderes': '',
        'armas': '',
        'caracteristicas': '',
      },
      {
        'nome': 'Mika',
        'imagem':'../../assets/personagens/Mika.jpg',
        'descricao': 'Escolhida pelos deuses contra a sua vontade, Mika Hoyanma — disfarçada sob seu alter ego Samtho —, descobre ser parte de uma profecia, que a cita como protetora de um herói misterioso que chegaria ao planeta. Para protegê-lo, a jovem deve buscar a liberação de seus chakras, para que, assim, consiga seus poderes e possa proteger o herói da profecia e ser a heroína de seu templo.',
        'poderes': '',
        'armas': '',
        'caracteristicas': '',
      },
      {
        'nome': 'Gnomo Cinzento',
        'imagem':'../../assets/personagens/Gnomo.jpg',
        'descricao': 'Mark um menino comum que vive sua vida com tranquilidade, exceto o fato dele sofrer um Bullyng constantemente na sua escola, até que ele descobre um herói que pode o ajudar nas situações de sua vida, mas esse não é o único lado da historia que muitas crianças passam, a outros pontos de vista onde o Gnomo Cinzendo ira descobrir junto com Mark.',
        'poderes': 'Trasmutar formas metal apartir de qualquer material que contenha madeira ou plantas',
        'armas': 'Punhos, espadas, machados, maças, armas de fogo, granadas, qualquer material composto de metal etc.',
        'caracteristicas': 'Gnomo é baixo até 1 metro de altura, bem nervoso e cuidadoso com seus poderes.',
      },
      {
        'nome': 'Guardião Eterno',
        'imagem':'../../assets/personagens/Guardiao.jpg',
        'descricao': 'Nenhum ser humano seria capaz de compreender o quão importante é esse ser, com o poder de proteger e harmonizar sistemas solares inteiros, se movimentando nas galaxias esse é um dos Guardiões eternos motivados pela sua missão, porém todo ser tem seu ponto fraco e é nessa historia que se descobre a fraqueza desse herói.',
        'poderes': '',
        'armas': '',
        'caracteristicas': '',
      },
      {
        'nome': 'Marcha 0',
        'imagem':'../../assets/personagens/Marcha.jpeg',
        'descricao': 'Um acidente trágico, um experimento do governo, uma mãe em busca de um filho. A vida de Scott é quebrada em mil pedaços em Marcha 0. Até aonde vale a pena lutar por aquilo que acreditamos?',
        'poderes': '',
        'armas': '',
        'caracteristicas': '',
      },
      {
        'nome': 'Texh',
        'imagem':'../../assets/personagens/Texh.png',
        'descricao': 'Para redimir o passado trágico de sua família, a jovem Tehx iniciará um grande jornada através da luz. Em meio a dúvidas e questionamentos de seu próprio ser, nossa heroína iluminará o caminho de todos que a cercam, mesmo que isso cause danos irreparáveis.',
        'poderes': '',
        'armas': '',
        'caracteristicas': '',
      },
      {
        'nome': 'Onus',
        'imagem':'../../assets/personagens/Onus.jpg',
        'descricao': 'Com braceletes adaptados capazes de emitir força bruta e manipular objetos metálicos, a jornada de Charles Prey é um misto de revolta, revolução e a busca incansável por aquilo que acreditamos. Pessoas pagarão caro por terem despertado a fúria de um homem comum.',
        'poderes': '',
        'armas': '',
        'caracteristicas': '',
      },

    ];

  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
    this.SwipedTabsSlider.slideTo(this.navParams.get("cod"), 0);
  }

  selectTab(index) {
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (100 * index) + '%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
    // A condição não pode ser maior que o index
    if (this.SwipedTabsSlider.length() > this.SwipedTabsSlider.getActiveIndex()) {
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (this.SwipedTabsSlider.getActiveIndex() * 100) + '%,0,0)';
    }

  }
  //Animação do indicador 
  animateIndicator($event) {
    if (this.SwipedTabsIndicator)
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress * (this.SwipedTabsSlider.length() - 1)) * 100) + '%,0,0)';
  }



}

