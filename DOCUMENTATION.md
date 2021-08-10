## 1. Az alkalmazás célja
​
Az alkalmazás célja a különböző gépek/gépjárművek és a hozzájuk kapcsolódó adatok, például szervizkönyv, tankolások nyilvántartása.
​
## 2. Az alkalmazás felépítése:
​
Az API szerver (backend) az `api` mappában található, a backend az express keretrendszerre épül. A frontend a `frontend` mappában található és Angular + Ionic keretrendszert használ.
​
## 3. Az alkalmazás indítása Dockerrel:
​
Klónozzuk le a git repository tartalmát, majd indítsuk el az alkalmazást a `docker compose up` paranccsal, a containerek indulása után a [localhost:8080](http://localhost:8080) címen érhetjük el a felhasználói felületet (frontendet).
​
A következő szolgáltatások fognak elindulni:
* API szerver (backend): localhost:3000
* Felhasználói felület (frontend): localhost:8080
* MongoDB: localhost:27017
​
Győzödjünk meg róla indítás előtt, hogy ezek a portok szabadok!
​
## 4. Az alkalmazás indítása Docker nélkül (fejlesztéshez):
### A backend indítása:
* Be kell állni az api mappába, `cd api`
* Telepíteni kell a szükséges csomagokat: `npm i`
* El kell indítani az alkalmazást az `npm start` paranccsal
​
### A frontend indítása:
* Be kell állni a frontend mappába: `cd frontend`
* Telepíteni kell a szükséges csomagokat `npm i`
* El kell indítani az alkalmazást az `npm start` paranccsal
​
Ha fejleszteni szeretnénk a frontendet, akkor javasolt az Angular CLI és az Ionic CLI telepítése:
```
npm i -g @angular/cli
npm i -g @ionic/cli
```
​
## 5. Az alkalmazás konfigurálása
Az alkalmazás környezeti változók segítségével konfigurálható, a backend esetén egy `.env` fájlban végezhetjük el a beállításokat, a frontend esetén az `src/environments/environment.ts` fájlban állíthatjuk az API végpontot.
​
## 6. A backend tesztelése
​
* Az összes teszt futtatása: `npm test`
* Csak a unit tesztek futtatása: `npm run test:unit`
* Csak az integrációs tesztek futtatása: `npm run test:integration`
​
## 7. Végpontok dokumentációja
A végpontok OpenAPI 3 (Swagger) szabványú specifikációval vannak dokumentálva (`api/openapi.yaml` fájlban). Az API dokumentáció webes felületen is megtekinthető: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
​
## 8. Angular service-ek automatikus generálása:
A service-ek és a modelleket leíró interface-ek az `src/apiservice` mappában találhatók és automatikusan lettek generálva az Openapi (Swagger) specifikáció alapján (Ne módosítsuk őket!). Amennyiben a specifikáció megváltozna az `npm run generate-service` paranccsal generállhatjuk újra a serviceket. A parancs az [OpenApi Generator](https://openapi-generator.tech/) csomagot használja, amelynek futtatásához Java szükséges.
​
## Hivatkozások
* [User Story (az admin szerepkörhöz)](https://github.com/Emens7/gepNyilvantarto/blob/main/README.md)