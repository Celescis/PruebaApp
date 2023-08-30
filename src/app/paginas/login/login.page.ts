import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../servicios/usuario/user.service';
import { ToastService } from '../../servicios/toast/toast.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  correo: FormControl = new FormControl('', [Validators.required, Validators.email]);

  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }
  //saque el async, ver si cambia algo
  Login() {
    this.userService.login(this.correo.value?.toString(), this.password.value?.toString())
      .then((response) => {
        let userEmail = response.user.email ? response.user.email : "";
        localStorage.setItem("email", userEmail);
        this.navCtrl.navigateRoot(['/home']);
      })
      .catch(async (error) => {
        let errorMessage = error.message;

        let color = 'danger';

        if (errorMessage.includes('email', 'password') || !this.correo.valid && !this.password.valid) {
          errorMessage = 'Debe ingresar su email y contraseña correcta';

        } else if (errorMessage.includes('password') || !this.password.valid) {
          errorMessage = 'Por favor, ingrese una contraseña válida.';
        } else {
          errorMessage = "Usuario inexistente";
        }
        this.toastService.CrearToast(errorMessage, "bottom", color);
      });
  }

  CargaUsuarios(boton: any) {
    let correo;
    let password;

    switch (boton) {
      case 1:
        correo = "admin@admin.com";
        password = "111111";
        break;
      case 2:
        correo = "invitado@invitado.com";
        password = "222222";
        break;
      case 3:
        correo = "usuario@usuario.com";
        password = "333333";
        break;
      default:
        correo = "";
        password = "";
    }

    this.correo.setValue(correo);
    this.password.setValue(password);
  }


  ionViewWillLeave() {
    this.correo.reset();
    this.password.reset();
  }
}


