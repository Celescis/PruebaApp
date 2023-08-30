import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { UserService } from '../../servicios/usuario/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  email: any;

  constructor(private navCtrl: NavController,
    private userService: UserService) {
    this.email = localStorage.getItem("email");
  }

  Back() {
    this.userService.logout().then(() => {
      this.navCtrl.navigateRoot(['/login']);
    });
  }

  ngOnInit() {

  }

}
