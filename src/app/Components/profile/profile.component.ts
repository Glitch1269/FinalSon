import { HotToastService } from '@ngneat/hot-toast';
import { Component, OnInit } from '@angular/core';
import { FbservisService } from 'src/app/services/fbservis.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Uyeler } from 'src/app/Models/uyeler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uye = this.servis.AktifUyeBilgi;
  frm: FormGroup = new FormGroup({
    uid: new FormControl(),
    mail: new FormControl(),
    displayName: new FormControl(),
    admin: new FormControl(),
    
  });
  constructor( public servis: FbservisService,
    public toast: HotToastService) { }

  ngOnInit() {
    this.servis.AktifUyeBilgi
    .subscribe((user) => {
      this.frm.patchValue({ ...user });
    });
  }
  Kaydet()  {
    this.servis.UyeDuzenle(this.frm.value).pipe(
        this.toast.observe({
          loading: 'Güncelleniyor',
          success: 'Güncellendi',
          error: 'Hata Oluştu',
        })
      )
      .subscribe();
  }
  
}
