censuredText/* *** CENSURATORE ***

 - Il software riceve in input un lungo testo e una serie di parole da censurare.
 - Restituisce il testo con xxx al posto delle parole censurate.
 - Stampa un "badword index" calcolato come il numero di parole censurate su il numero di parole totali

*/

var testo = "In informatica JavaScript è un linguaggio di SCRIPTING orientato agli OGGETTI e agli"  +
            "EVENTI, comunemente utilizzato nella programmazione Web LATO CLIENT per la creazione," +
            "in siti web e applicazioni Web, di effetti dinamici interattivi tramite funzioni di"   +
            "script invocate da eventi innescati a loro volta in vari modi dall'utente sulla"       +
            "pagina web in uso (mouse, tastiera, caricamento della pagina ecc...).";

var censuredText = testo.split(" ");

// Lista parole da censurare
var badwordList = ["scripting", "oggetti", "effetti", "loro", "pagine", "web"];
console.log(badwordList);

// contatore che conterrà il numero di parole censurate nel testo;
var badWordCounter = 0;

for (var i = 0; i < badwordList.length; i++) {
   //Ciclo interno che confronta ognia parola del testo con l'elenco di parole da censurare.
   //Se viene trovata una parola da censurare essa verrà sostiutita con una stringa di "x".
   for (var j = 0; j < censuredText.length; j++) {

      InsesitiveCaseWord = badwordList[i];

      //Regex che permette di eseguire una ricerca case-insensitive delle parole
      //Se la ricerca non produrrà un risultato ritornerà -1.
      var re = new RegExp("^" + InsesitiveCaseWord + "$", "i");

      if( ( censuredText[j].search(re) != -1 ) ){
         var wordFound = censuredText[j];
         censuredText.splice( j, 1, replaceWithX(wordFound.length) );
         badWordCounter ++;
      }
   }
}

console.log("Bad word Counter: " + badWordCounter);

document.write(testo + "<br><br>");
document.write( censuredText.join(" ") );
alert( "Qualità del testo: " + calcBadIndex(censuredText, badWordCounter));

// Funzione che riceve la lunghezza della parola da sostituire e genera una stringa
// con un numero di x pari alla lunghezza della parola da sostiutire
function replaceWithX (wordFoundLength) {
   replacedStr = "";
   for (var i = 0; i < wordFoundLength; i++) {
      replacedStr += "x";
   }
   return replacedStr;
}

// Funzione che definisce la qualità del testo che riceve in input rapportando
// il numero di parole censurate presenti e il numero di parole totali del testo.
function calcBadIndex (censuredText, badWordCounter) {
   var textContent = ["good", "normal", "bad", "verybad"];
   var badwordIdex = "";
   var res = badWordCounter / censuredText.length;
   console.log(res);
   if (res < 0.25) {
      badwordIdex = textContent[0];
   } else if ( (res >= 0.25) && (res < 0.50) ){
      badwordIdex = textContent[1];
   } else if ( (res >= 0.50) && (res < 0.75) ){
      badwordIdex = textContent[2];
   } else {
      badwordIdex = textContent[3];
   }
   return badwordIdex;

}
