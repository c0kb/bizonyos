const fs = require('fs');

fs.readFile('dobasok.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Hiba a fájl beolvasásakor:', err);
        return;
    }

    const dobasok = data.split(', ').map(Number);
    console.log("A beolvasott dobások:", dobasok);

    const leghosszabbLetra = ellenorizLetra(dobasok);
    console.log("A leghosszabb létra:", leghosszabbLetra);

    const ujDobasok = [];
    for (let i = 0; i < 18; i++) {
        ujDobasok.push(Math.floor(Math.random() * 6) + 1);
    }
    console.log("Új dobások:", ujDobasok);

    fs.appendFile('dobasok.txt', '\n' + ujDobasok.join(', '), (err) => {
        if (err) {
            console.error('Hiba az adatok fájlba írásakor:', err);
        } else {
            console.log('Új adatok sikeresen hozzáadva a fájlhoz.');
        }
    });
});

function ellenorizLetra(dobasok) {
    let leghosszabbLetra = [];
    let aktualisLetra = [];

    for (let i = 0; i < dobasok.length; i++) {
        if (aktualisLetra.length === 0 || dobasok[i] >= aktualisLetra[aktualisLetra.length - 1]) {
            aktualisLetra.push(dobasok[i]);
        } else {
            if (aktualisLetra.length > leghosszabbLetra.length) {
                leghosszabbLetra = aktualisLetra;
            }
            aktualisLetra = [dobasok[i]];
        }
    }

    if (aktualisLetra.length > leghosszabbLetra.length) {
        leghosszabbLetra = aktualisLetra;
    }

    return leghosszabbLetra;
}
