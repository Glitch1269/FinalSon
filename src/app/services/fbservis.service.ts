import { Yorumlar } from './../Models/Yorumlar';
import { Kategori } from './../Models/kategori';
import { Araba } from './../Models/araba';
import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { Uyeler } from '../Models/uyeler';
import { Kira } from '../Models/Kiralama';
import { Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  UserInfo, } from '@angular/fire/auth';




@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  aktifUye = authState(this.auth);

constructor(
  public fs: Firestore,
  public auth: Auth,
) { }

KayitOl(mail: string, parola: string) {
  return from(createUserWithEmailAndPassword(this.auth, mail, parola));
}
OturumAc(mail: string, parola: string) {
  return from(signInWithEmailAndPassword(this.auth, mail, parola));
}
OturumKapat() {
  return from(this.auth.signOut());
}

get AktifUyeBilgi() {
  return this.aktifUye.pipe(
    switchMap((User) => {
      if (!User?.uid) {
        return of(null);
      }
      const ref = doc(this.fs, 'Users', User.uid);
      return docData(ref) as Observable<Uyeler>;
    })
  );
}

// ! Arabalar Kısmı
ArabaListele() {
  var ref = collection(this.fs, "Cars");
  return collectionData(ref , { idField: 'arabaId'}) as Observable<Araba[]>;
}
ArabaEkle(araba: Araba) {
  var ref = collection(this.fs, "Cars");
  return addDoc(ref, araba);
}
ArabaDuzenle(araba: Araba) {
  var ref = doc(this.fs, "Cars/" + araba.arabaId);
  return updateDoc(ref, { ...araba });
}
ArabaSil(araba: Araba) {
var ref = doc(this.fs, "Cars/" + araba.arabaId);
return deleteDoc(ref);
}

// ! Üyeler Kısmı

UyeListele() {
  var ref = collection(this.fs, "Users");
  return collectionData(ref, { idField: 'uid' }) as Observable<Uyeler[]>;
}
UyeIdGore(uid: number) {
  var ref = collection(this.fs, "Users");
  return collectionData(ref, { idField: 'uid/' + uid }) as Observable<Uyeler[]>;
}
UyeEkle(users: Uyeler) {
  var ref = collection(this.fs, "Users");
  return addDoc(ref, users);
}
UyeDuzenle(users: Uyeler) {
  var ref = doc(this.fs, "Users" + users.uid);
  return from(updateDoc(ref, { ...users }));
}
UyeSil(users: Uyeler) {
  var ref = doc(this.fs, "Users/" + users.uid);
  return deleteDoc(ref);
}

// ! Kategoriler Kısmı
KategoriListele() {
  var ref = collection(this.fs, "Categories");
  return collectionData(ref, { idField: 'katId' }) as Observable<Kategori[]>;
}
KategoriIdGore(katId: number) {
  var ref = collection(this.fs, "Categories");
  return collectionData(ref, { idField: 'katId/' + katId }) as Observable<Kategori[]>;
}
KategoriEkle(kategori : Kategori) {
  var ref = collection(this.fs, "Categories");
  return addDoc(ref, kategori);
}
KategoriDuzenle(kategori : Kategori) {
  var ref = doc(this.fs, "Categories/" + kategori.katId);
  return updateDoc(ref, { ...kategori });
}
KategoriSil(kategori : Kategori) {
  var ref = doc(this.fs, "Categories/" + kategori.katId);
  return deleteDoc(ref);
}

// ! Kiralama
KiraciListele() {
  var ref = collection(this.fs, "Tenants");
  return collectionData(ref, { idField: 'id' }) as Observable<Kira[]>;
}
KiraciIdGore(id: number) {
  var ref = collection(this.fs, "Tenants");
  return collectionData(ref, { idField: 'id/' + id }) as Observable<Kira[]>;
}
KiraciEkle(kiraci: Kira) {
  var ref = collection(this.fs, "Tenants");
  return addDoc(ref, kiraci);
}
KiraciDuzenle(kiraci: Kira) {
  var ref = doc(this.fs, "Tenants/" + kiraci.id);
  return updateDoc(ref, { ...kiraci });
}
KiraciSil(kiraci: Kira) {
  var ref = doc(this.fs, "Tenants/" + kiraci.id);
  return deleteDoc(ref);
}

}