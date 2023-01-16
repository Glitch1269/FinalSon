export class Araba {
    arabaId!: string;
    img!: string;
    marka!: string;
    model!: string;
    detay!: string;
    yolcu!: string;
    yakit!: string;
    kayit!: string;   //! Kayıt tarihi
    uid!:string ;  // ! Kim Kiraladı  
    duzen!: string;   //! ilan tarihi    
    categoryId!:number; //! kategori Binek ticari ve eklenebilir olacak
    categoryAdi!:string; 
    durum!: boolean;
    kira: any;
}