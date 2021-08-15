# User Story - Adminisztráció
## _Gép(jármű) adat nyilvántartó_

A project itt elérhető: https://cars.dbhir.com/

## 1. Főoldal

Admisztrációs felület a felhasználó belépéséhez vagy regisztrációhoz.

Az oldal felépítésének rövid leírása:
> Az oldal elsősorban mobil felhasználásra készül,
> Angular FrontEnd,
> NodeJs Backend



## 2. Regisztrációs oldal

Regisztráció az alkalmazásba

A regisztrációs oldalon a felhasználó megadja az email címét és jelszavát, megerősítő jelszavát.

## 3. Admin oldal

Gép(jármű) kiválasztása rendszám vagy név alapján

- Gép(jármű) kiválasztása rendszám vagy típusa alapján így a kiválasztott gép oldalra jutás
- Új gép(jármű) + gombra rákkatintva új Gép(jármű) felvitel oldalra lépés

## 4. Új gép(jármű) hozzáadás oldal

Itt adható hozzá új gép(jármű) az adatbázishoz

- Gép(jármű) elnevezése, típusa
- Gép(jármű) rendszáma 
- Gép(jármű) alvázszáma (opcionális)
- Egyéb:  (opcionális)

## 5. Kiválasztot gép(jármű) oldal

Itt tekinthetőek meg a felvitt adatok. Egyes gép(jármúvekről) időrendben a legújabb legfelül. Itt választható ki a különböző részletesebb információ.

## 6. Fogyasztási adatok oldal

Gép(jármű) üzemanyag vásárlásával kapcsolatos adatok

- Dátum
- Kilométer óra állás
- Tankolt üzemanyag
- Kifizetett összeg
- Egyéb megjegyzés (opcionális)

## 7. Szervíz adatok szerkesztése oldal

Gép(jármű) fenntartási költségeinek nyilvántartása
- Munka megnevezése
- Dátum
- Kilométer óra állása
- Szervízköltség
- Elvégzett munka leírása (opcionális)

## Project egyéb adatai:
Megvalósítás időtartama 10 hét

#### További fejlesztési lehetőségek:
- Az admin oldalon a különböző gép(járművek) sorrendje tetszés szerint változtatható legyen (darag and drop).
- Fényképező funkció + fénykép mappa.
- Részletes keresés 
- A visszaigazoló email a regisztrációról.
- Figyelmeztetés email-ben küldés aktuális olaj cserére stb.
- Hangalapú utasítás
- ODB csatlakozóval mobil-nettel valós időbeni követés.

## License

MIT