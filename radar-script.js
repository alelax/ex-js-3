/*  *** RADAR ***

   Il software ha una lista di objects che rappresentano aerei in volo:
   ogni oggetto contiene latitudine e longitudine della posizione dell'aereo,
   quanto kg di carburante ha a bordo e quanti km può fare con ogni kg di carburante.
   Inoltre, il software ha una lista di lat e long di aeroporti.
   La domanda a cui deve rispondere il software è la seguente:
   c'è qualche aereo che non ha abbastanza carburante per atterrrare
   in un qualsiasi aeroporto?
   Se c'è deve lanciare un alert() (nel vero senso della parola :P)

*/

// Lista di oggetti aereo
var listaAerei = [
   { "id": 'A380', "lat": 32.21297306, "long": -27.51443939, "kerosene": 310000, "consumo": 50}, // kg di carburante (approssimato 1kg ca. 1lt), consumo Km/Kg.
   { "id": 'B747', "lat": 20.21297306, "long": 37.51443939, "kerosene": 65, "consumo": 194},
   { "id": 'C226', "lat": 45.58347306, "long": 29.51443939, "kerosene": 95000,  "consumo": 235},
   { "id": 'D671', "lat": -15.56124458, "long": -20.51443939, "kerosene": 120, "consumo": 72},
]

// Lista di oggetti aerporto
var listaAeroporti = [
   { "nome": 'Malpensa', "lat": 45.6300625, "long": 8.7255307 },
   { "nome": 'Los Angeles', "lat": 33.9415889, "long": -118.40853 },
   { "nome": 'Buenos Aires', "lat": -34.5580305, "long": -58.4170088 },
   { "nome": 'Sidney', "lat": -33.9399228, "long": 151.1752764 }
]

for (var i = 0; i < listaAerei.length; i++) {
   // Il ciclo interno permette di calcolare la distanza di un aereo da tutti gli aeroporti disponibili
   for (var j = 0; j < listaAeroporti.length; j++) {

      var distanza = Math.floor( getDistanceFromLatLonInKm( listaAerei[i].lat, listaAerei[i].long, listaAeroporti[j].lat, listaAeroporti[j].long) );
      var litriNecessari = manyLtNeed( distanza, listaAerei[i].consumo );

      arrivoOMiSchianto(listaAerei[i], listaAeroporti[j], litriNecessari);
      // console.log(distanza);
      // console.log(litriNecessari);
      // console.log("<br>");
   }
   document.write("<br>");
}

//Funzione che confronta il carburante disponibile per un aereo con quello necessario per raggiungere un determinato aeroporto
function arrivoOMiSchianto( aereo, aeroporto, litriNecessari ) {
   if ( aereo.kerosene > litriNecessari ) {
      document.write("L'aereo " + aereo.id + " può raggiungere l'aereoporto di " + aeroporto.nome + "<br>");
   } else {
      document.write("L'aereo " + aereo.id + " NON HA carburante necessario per raggiungere l'aereoporto di " + aeroporto.nome + "<br>");
   }
}

// Funzione per il calcole della distanza tra due punti terrestri identificati con lat e long
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

// Funzione che calcola la quantità di carburante necessario per coprire la distanza inserita come parametro
function manyLtNeed (distanza, consumoAereo) {
   return distanza / consumoAereo;
}
