window.onload = function () {
    notlariGetir();
};

function kaydet() {
    var notTextarea = document.getElementById('notTextarea');
    var not = notTextarea.value;
    var etiket = document.getElementById('etiket').value;

    if (not.trim() !== '') {
        var notlar = JSON.parse(localStorage.getItem('notlar')) || [];
        var yeniNot = {
            not: not,
            etiket: etiket,
            tarih: new Date().toLocaleString()
        };
        notlar.push(yeniNot);
        localStorage.setItem('notlar', JSON.stringify(notlar));

        notTextarea.value = '';
        notlariGetir();
    } else {
        alert('Lütfen bir not girin.');
    }
}

function notlariGetir() {
    var kaydedilenNotlar = document.getElementById('kaydedilenNotlar');
    kaydedilenNotlar.innerHTML = '';

    var notlar = JSON.parse(localStorage.getItem('notlar')) || [];
    var filtreEtiket = document.getElementById('etiket').value;
    var siralama = document.getElementById('siralama').value;

    notlar = notlar.filter(function (not) {
        return filtreEtiket === '' || not.etiket === filtreEtiket;
    });

    if (siralama === 'tarih-azalan') {
        notlar.sort(function (a, b) {
            return new Date(b.tarih) - new Date(a.tarih);
        });
    } else if (siralama === 'tarih-artan') {
        notlar.sort(function (a, b) {
            return new Date(a.tarih) - new Date(b.tarih);
        });
    }

    notlar.forEach(function (not, index) {
        var notDiv = document.createElement('div');
        notDiv.className = 'not';

        var notP = document.createElement('p');
        notP.innerHTML = '<span class="' + not.etiket.toLowerCase() + '">' + not.etiket + '</span> ' + not.not + ' - ' + not.tarih;

        var duzenleButton = document.createElement('button');
        duzenleButton.textContent = 'Düzenle';
        duzenleButton.onclick = function () {
            notuDuzenle(index);
        };

        var silButton = document.createElement('button');
        silButton.textContent = 'Sil';
        silButton.onclick = function () {
            notuSil(index);
        };

        notDiv.appendChild(notP);
        notDiv.appendChild(duzenleButton);
        notDiv.appendChild(silButton);

        kaydedilenNotlar.appendChild(notDiv);
    });
}

function notuDuzenle(index) {
    var notlar = JSON.parse(localStorage.getItem('notlar')) || [];
    var duzenlenecekNot = notlar[index];

    var notTextarea = document.getElementById('notTextarea');
    notTextarea.value = duzenlenecekNot.not;

    var etiketSelect = document.getElementById('etiket');
    etiketSelect.value = duzenlenecekNot.etiket;

    notlar.splice(index, 1);
    localStorage.setItem('notlar', JSON.stringify(notlar));

    notlariGetir();
}

function notuSil(index) {
    var notlar = JSON.parse(localStorage.getItem('notlar')) || [];
    notlar.splice(index, 1);
    localStorage.setItem('notlar', JSON.stringify(notlar));

    notlariGetir();
}

function filtrele() {
    notlariGetir();
}
