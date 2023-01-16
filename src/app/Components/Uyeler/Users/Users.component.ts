import { MytoastService } from './../../../services/mytoast.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Uyeler } from 'src/app/Models/uyeler';
import { FbservisService } from 'src/app/services/fbservis.service';
import * as bootstrap from 'bootstrap';
import { Sonuc } from 'src/app/Models/Sonuc';
import { Kira } from 'src/app/Models/Kiralama';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-Users',
  templateUrl: './Users.component.html',
  styleUrls: ['./Users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    public servis: FbservisService,
    public toast: MytoastService,
    public router: Router,
    public htoast: HotToastService
  ) { }
  modal!:  Modal;
  uyeler!: Uyeler[];
  secUye!: Uyeler;
  modalBaslik= "";
  kiraci!: Kira[];
  kiralayan!: Kira;
  id: number = 0;

  uyeEkleForm : FormGroup = new FormGroup({
    uid: new FormControl(),
    displayName: new FormControl(),
    mail: new FormControl(),
    admin: new FormControl(),  
    kaytarih: new FormControl(),
  });


  ngOnInit() {
    this.servis.AktifUyeBilgi
    .subscribe((user) => {
      this.uyeEkleForm.patchValue({ ...user });
    });
    this.KiraciListele();
    this.UyeListele();
    
  }



  ProfileModal(uye: Uyeler,el: HTMLElement){
      this.uyeEkleForm.patchValue(uye);
      this.modalBaslik = "Üye Sil"
      this.modal = new bootstrap.Modal(el);
      this.modal.show(); 
  }

  KiraciListele() {
    this.servis.KiraciListele().subscribe(d => {
      this.kiraci = d;
    });
  }
    

  Kaydet() {
    this.servis
      .UyeDuzenle(this.uyeEkleForm.value)
      .pipe(
        this.htoast.observe({
          loading: 'Güncelleniyor',
          success: 'Güncellendi',
          error: 'Hata Oluştu',
        })
      )
      .subscribe();
  }

  EkleModal(el: HTMLElement) {
    this.uyeEkleForm.reset();
    this.modalBaslik = "Üye Ekle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  
Sil(users: Uyeler) {
  this.servis.UyeSil(users).then(() => {
    var s: Sonuc = new Sonuc();
    s.islem = true;
    s.mesaj = "Üye Silindi";
    this.toast.ToastUygula(s);
  });
}

  UyeListele(){
    this.servis.UyeListele().subscribe(d => {
      this.uyeler = d;
    });
  }

}

