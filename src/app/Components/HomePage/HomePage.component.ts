import { Sonuc } from './../../Models/Sonuc';
import { MytoastService } from 'src/app/services/mytoast.service';
import { Araba } from './../../Models/araba';
import { Uyeler } from 'src/app/Models/uyeler';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { FbservisService } from 'src/app/services/fbservis.service';
import { Kategori } from 'src/app/Models/kategori';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';

import { ActivatedRoute } from '@angular/router';
import { Yorumlar } from 'src/app/Models/Yorumlar';
import { Kira } from 'src/app/Models/Kiralama';
@Component({
  selector: 'app-HomePage',
  templateUrl: './HomePage.component.html',
  styleUrls: ['./HomePage.component.css'],
})
export class HomePageComponent implements OnInit {
  kategoriler!: Kategori[];
  secKat: Kategori[] = [];
  arabalar!: Araba[];
  araba!: Araba;
  kullanici!: Uyeler[];
  kiralayan!: Kira[];
  modalBaslik = '';
  modal!: Modal; 
  id: number = 0;
  sonuc: Sonuc = new Sonuc(); 
  yorum!: Yorumlar[];
  secYorum!: Yorumlar;

  ArabaModal: FormGroup = new FormGroup({
    arabaId: new FormControl(),
    img: new FormControl(),
    marka: new FormControl(),
    model: new FormControl(),
    detay: new FormControl(),
    yolcu: new FormControl(),
    yakit: new FormControl(),
    kayit: new FormControl(),
    duzen: new FormControl(),
    kira: new FormControl(),
    categoryId: new FormControl(),
    uid: new FormControl(),
  });

  kirala: FormGroup = new FormGroup({
    id : new FormControl(), //! Burası yeni idsi olucak 
    gecmisKira: new FormControl(), // ! nurası kayıt tarihi olsun 
    userId: new FormControl(),  //! Kiralayan kişinin Idsi
    arabaId: new FormControl(), //! Kiraladığı arabanın Idsi
  });

  commentD: FormGroup = new FormGroup({
    adsoyad: new FormControl(),
    yorum: new FormControl(),
  });

  KiralaModal: FormGroup = new FormGroup({
  userId: new FormControl(),

  });
  constructor(public servis: FbservisService,
    public toast: MytoastService,
    public route: ActivatedRoute) {}

  ngOnInit() {
    this.KategoriListele();
    this.ArabaListele();
    this.UyeListele();
    this.KiraciListele();

  }


ArabaEkleDuzenle() {
  var car: Araba = this.ArabaModal.value
  var tarih = new Date();
  if (!car.arabaId) {
    var filtre = this.arabalar.filter(s => s.img == car.img);
    if (filtre.length > 0) {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Başkasının Resmi Kendi İlanınızda Kullanılamaz !";
      this.toast.ToastUygula(this.sonuc);
    } else {
      car.kayit = tarih.getTime().toString();
      car.duzen = tarih.getTime().toString();
      this.servis.ArabaEkle(car).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Araba Eklendi";
        this.toast.ToastUygula(this.sonuc);
        this.ArabaListele();
        this.modal.toggle();
      });
    }
  } else {
    car.duzen = tarih.getTime().toString();
    this.servis.ArabaDuzenle(car).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Araba Düzenlendi";
      this.toast.ToastUygula(this.sonuc); 
      this.ArabaListele();
      this.modal.toggle();
    });
  }
}  


  DuzenleModal(car: Araba, el: HTMLElement) {
    this.ArabaModal.patchValue(car);
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  Sil(araba: Araba) {
    this.servis.ArabaSil(araba).then(() => {
      var s: Sonuc = new Sonuc();
      s.islem = true;
      s.mesaj = "Araba Silindi";
      this.toast.ToastUygula(s);
    });
  }

  KategoriListele() {
    this.servis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    });
  }

  UyeListele() {
    this.servis.UyeListele().subscribe(d => {
      this.kullanici = d;
    });
  }

  KiraciListele() {
    this.servis.KiraciListele().subscribe(d => {
      this.kiralayan = d;
    });
  }

  KiraciEkle(){
      var kiraci : Kira = this.kirala.value
      var tarih = new Date();
      console.log(this.kirala.value);
      kiraci.kayit = tarih.getTime().toString();
      this.servis.KiraciEkle(this.kirala.value).then(() => {
        var s: Sonuc = new Sonuc();
        s.islem = true;
        s.mesaj = "Kiraci Eklendi";
        this.toast.ToastUygula(s);
      });
  }

  KiraciModal(car: Araba, el: HTMLElement) {
    this.kirala.patchValue(car);
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }


  EkleModal(el: HTMLElement) {
    this.ArabaModal.reset();
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  Kaydet() {
    var araba : Araba = this.ArabaModal.value
    var tarih = new Date();
    console.log(this.ArabaModal.value);
    araba.kayit = tarih.getTime().toString();
    this.servis.ArabaEkle(this.ArabaModal.value).then(() => {
      var s: Sonuc = new Sonuc();
      s.islem = true;
      s.mesaj = "Araba Eklendi";
      this.toast.ToastUygula(s);
    });
  }

  ArabaListele(){
 
    this.servis.ArabaListele().subscribe(d => {
      this.arabalar = d;
    });

}


  // YorumListele() {

  // this.servis.YorumListele().subscribe(d => {

  // this.yorum = d;

  // });
  // }


  // YorumEkle() {
  //   var cmmnt: Yorumlar = this.commentD.value 
  //   if (!cmmnt.yorum || !cmmnt.adsoyad){
  //   this.sonuc.islem = false;
  //   this.sonuc.mesaj = "Yorum veya İsim Boş Geçilemez!";
  //   this.toast.ToastUygula(this.sonuc);
  //   } else {
  //   this.servis.YorumEkle(cmmnt).then(d => {
  //     this.sonuc.islem = true;
  //     this.sonuc.mesaj = "Yorum Eklendi";
  //     this.toast.ToastUygula(this.sonuc);
  //     this.YorumListele();
  //     });  
  //   }  
  // }

  // YorumlariSilM(comment: Yorumlar, el:HTMLElement) {
  //   this.secYorum = comment;
  //   this.modalBaslik = "Yorum Sil";
  //   this.modal = new bootstrap.Modal(el);
  //   this.modal.show();
  // }

  // YorumSil() {
  //   this.servis.YorumSil(this.secYorum.yorumId).then(d => {
  //     this.sonuc.islem = true;
  //     this.sonuc.mesaj = "Yorum Silindi";
  //     this.toast.ToastUygula(this.sonuc);
  //     this.YorumListele();
  //     this.modal.toggle();
  //   });
  // }
  
}
