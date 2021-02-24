const yeniGorev = document.querySelector('.gorev');
const yeniGorevEkle = document.querySelector('.btn-grv');
const gorevListesi = document.querySelector('.gorevler-item');

yeniGorevEkle.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click', gorevSilTamamla);
document.addEventListener('DOMContentLoaded', localStorageOku);

function gorevSilTamamla(e){
    const tiklanilan = e.target;

    if(tiklanilan.classList.contains('gorev-btn-tamam')){

        tiklanilan.parentElement.classList.toggle('gorev-tamam');
    }

    if(tiklanilan.classList.contains('gorev-btn-sil')){

        tiklanilan.parentElement.classList.toggle('kaybol');
        const silinecekGorev = tiklanilan.parentElement.children[0].innerText;
        localStorageSil(silinecekGorev);
        tiklanilan.parentElement.remove();
    }
}

function gorevEkle(e){
    
    e.preventDefault();

    gorevItemOlustur(yeniGorev.value);

    localStorageKaydet(yeniGorev.value);
    yeniGorev.value = ' ';

}

function localStorageKaydet(yeniGorev){
    let gorevler;

    if(localStorage.getItem('gorevler') === null){
        gorevler = [];
    }
    else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler', JSON.stringify(gorevler));
}

function localStorageOku(){
    let gorevler;

    if(localStorage.getItem('gorevler') === null){
        gorevler = [];
    }
    else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

    gorevler.forEach(function(gorev){
        gorevItemOlustur(gorev);
    })
}

function gorevItemOlustur(gorev){
    //div oluşturma
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev');

    //li oluşturma
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.innerText = gorev;
    gorevDiv.appendChild(gorevLi);

    //tamam butonu
    const gorevTamam = document.createElement('button');
    gorevTamam.classList.add('gorev-btn');
    gorevTamam.classList.add('gorev-btn-tamam');
    gorevTamam.innerHTML = '<i class="fa fa-check-square" aria-hidden="true"></i>';
    gorevDiv.appendChild(gorevTamam);

    //sil butonu
    const gorevSil = document.createElement('button');
    gorevSil.classList.add('gorev-btn');
    gorevSil.classList.add('gorev-btn-sil');
    gorevSil.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    gorevDiv.appendChild(gorevSil);
    
    // ul ye div ekle
    gorevListesi.appendChild(gorevDiv);
}

function localStorageSil(gorev){
    let gorevler;

    if(localStorage.getItem('gorevler') === null){
        gorevler = [];
    }
    else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

    //splice ile sil
    const silinecekElemen = gorevler.indexOf(gorev);
    console.log(silinecekElemen);
    gorevler.splice(silinecekElemen, 1);

    localStorage.setItem('gorevler', JSON.stringify(gorevler));

}