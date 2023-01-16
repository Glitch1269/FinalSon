import { Modal } from 'bootstrap';
import { Sonuc } from './../../../Models/Sonuc';
import { Kategori } from './../../../Models/kategori';
import { Uyeler } from 'src/app/Models/uyeler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FbservisService } from 'src/app/services/fbservis.service';
import { MytoastService } from 'src/app/services/mytoast.service';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-Categories',
  templateUrl: './Categories.component.html',
  styleUrls: ['./Categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(
    public servis: FbservisService,
    public toast: MytoastService
  ) { }
kategoriler!: Kategori[];
secKat!: Kategori;
sonuc: Sonuc = new Sonuc();
modal!: Modal


KatEkle: FormGroup = new FormGroup({
  adi: new FormControl(),
  kayTarih: new FormControl()
});

katDzn: FormGroup = new FormGroup({
  adi: new FormControl(),
  kayTarih: new FormControl(),
  katId: new FormControl(),

});

  ngOnInit() {
    this.KategoriGetir();
  }


KategoriGetir(){
 
    this.servis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    });

}


DuzenleModal(kat: Kategori, el: HTMLElement) {
  this.KatEkle.patchValue(kat);
  this.modal = new bootstrap.Modal(el);
  this.modal.show();
}
EkleModal(el: HTMLElement) {
  this.KatEkle.reset();
  this.modal = new bootstrap.Modal(el);
  this.modal.show();
}
Duzenle() {
  console.log(this.KatEkle.value);
  this.servis.KategoriDuzenle(this.KatEkle.value).then(() => {
    var s: Sonuc = new Sonuc();
    s.islem = true;
    s.mesaj = "Kategori dÜzenlendi";
    this.toast.ToastUygula(s);
  });
}

Kaydet() {
  var kat : Kategori = this.KatEkle.value
  var tarih = new Date();
  console.log(this.KatEkle.value);
  kat.kayTarih = tarih.getTime().toString();
  this.servis.KategoriEkle(this.KatEkle.value).then(() => {
    var s: Sonuc = new Sonuc();
    s.islem = true;
    s.mesaj = "Kategori Eklendi";
    this.toast.ToastUygula(s);
  });
}

Sil(kat: Kategori) {
  this.servis.KategoriSil(kat).then(() => {
    var s: Sonuc = new Sonuc();
    s.islem = true;
    s.mesaj = "Kategori Silindi";
    this.toast.ToastUygula(s);
  });
}

}
