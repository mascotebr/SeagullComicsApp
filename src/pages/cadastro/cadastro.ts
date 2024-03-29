import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateConfirmPassword } from '../../validators/confirmPassword';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { PdfPage } from '../pdf/pdf';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { HqsPage } from '../hqs/hqs';
import { DatabaseProvider } from '../../providers/database/database';


@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  registerForm: FormGroup;

  usuarios: any;

  check = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public servidor: ServidorProvider,
    public http: Http,
    public toastCtrl: ToastController,
    public formbuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public globalvars:GlobalvarsProvider,
    public database:DatabaseProvider,
 
  ) {

    this.registerForm = this.formbuilder.group({
      nome: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(5)]],
      senhaConfirm: [null, [Validators.required, Validators.minLength(5), ValidateConfirmPassword]],
    });
  }

  EfetuarCadastro() {

if( this.registerForm.value.senha !=  this.registerForm.value.senhaConfirm){
  this.Toast("As duas senhas não estão iguais");
}else{


    this.afAuth.auth.createUserWithEmailAndPassword(
      this.registerForm.value.email,
      this.registerForm.value.senha
    ).then((response) => {
      
      this.db.database.ref('/usuarios').child(response.user.uid).push({
        nome: this.registerForm.value.nome,
        status: 'Ativo',
        desconto: '',
      })
        .then(() => {
          this.db.database.ref('usuarios/').child(response.user.uid).child('hqs').set("");
          this.db.database.ref('usuarios/').child(response.user.uid).child('biblioteca').set("");

          this.globalvars.setUser(response.user.uid.toString());
          this.database.setStorageUser(response.user.uid.toString());
          this.navCtrl.setRoot(HqsPage);
          this.Toast("Conta criada com sucesso!");
        })
        .catch((error) => {
          console.log(error);
        });

    })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.Toast("Esse e-mail já foi cadastrado");
            break;
          case 'auth/invalid-email':
            this.Toast("Esse e-mail é invalido");
            break;
          case 'auth/weak-password':
            this.Toast("Essa senha é muito fraca");
            break;
        }
      });
    }    
  }

  EfetuarLogin(){
    this.afAuth.auth.signInWithEmailAndPassword(
      this.registerForm.value.email, this.registerForm.value.senha
      ).then((response) =>{
          this.globalvars.setUser(response.user.uid.toString());
         
            this.navCtrl.setRoot(HqsPage);
      }).catch((error) =>{
        
        switch (error.code){
          case 'auth/user-not-found':
          this.Toast("Usuario não cadastrado");
          break;
          case 'auth/wrong-password':
          this.Toast("Senha invalida");
          this.registerForm.controls['senha'].setValue(null);
          break;
      }
      }
      );
  }

  Toast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
    })

    toast.present();
  }

  VoltarPage() {
    this.navCtrl.pop();
  }

  OpenPdf(){
   this.navCtrl.push(PdfPage);
  }
}
