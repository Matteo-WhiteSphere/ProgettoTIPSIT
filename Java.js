/*
---------------------------------------------------------------------------------------------------------------------
|SISTEMA DI NAVIGAZIONE LIBRO INTERATTIVO CON ANIMAZIONI DI SFOLIATURA                                              |
---------------------------------------------------------------------------------------------------------------------
 
Questo file gestisce completamente la navigazione del libro (Star Wars: Death Star)
con animazioni realistiche che simulano la sfogliatura di pagine reali.
 
FUNZIONALITÀ PRINCIPALI:
- Navigazione tra pagine con frecce e pulsanti
- Animazioni 3D di sfogliatura (flip page)
- Supporto tastiera (ArrowLeft/ArrowRight)
- Navigazione circolare (dall'ultima si torna alla prima)
- Aggiornamento dinamico del titolo con pagina corrente
- Indicatori di caricamento durante le animazioni
 
STRUTTURA DEL CODICE:
1. VARIABILI GLOBALI: gestione stato e animazioni
2. ARRAY PAGINE: percorsi delle immagini del libro
3. FUNZIONE PRINCIPALE: caricaPagina() - gestisce caricamento e animazioni
4. FUNZIONI DI NAVIGAZIONE: paginaSuccessiva(), paginaPrecedente()
5. FUNZIONI DI SUPPORTO: aggiornaTitolo(), animaSfogliatura()
6. EVENT LISTENERS: click su pulsanti e tastiera
 
ANIMAZIONI IMPLEMENTATE:
- page-flip-right: pagina che esce a destra (rotateY -20deg + translateX -100%)
- page-flip-left: pagina che esce a sinistra (rotateY 20deg + translateX 100%)
- page-enter-right: nuova pagina entra da destra
- page-enter-left: nuova pagina entra da sinistra
 
COME USARE:
1. Modificare l'array 'pagineLibro' con i percorsi reali delle immagini
2. Le animazioni partono automaticamente al caricamento della pagina
3. Usa le frecce della tastiera o i pulsanti per navigare
4. Il titolo si aggiorna automaticamente con "Pagina X/Y"
 
AUTORE: GAL
VERSIONE: 2.3 [vecchie versione già sostituite con i push: 0.1, 1.1, 2.0, 2.1]
DATA: 6 Marzo 2026
---------------------------------------------------------------------------------------------------------------------   
*/

// Script JavaScript per gestire la navigazione tra le pagine del libro

// Variabile globale per tenere traccia della pagina corrente
let paginaCorrente = 1;

// Variabile per controllare se un'animazione è già in corso
let animazioneInCorso = false;

// Array contenente i percorsi delle pagine del libro
// Modifica questo array con le pagine reali del tuo libro
const pagineLibro = [
    'img/libro1/pagina1.png',  // Pagina 1
    'img/libro1/pagina2.png',  // Pagina 2
    'img/libro1/pagina3.png',  // Pagina 3
    'img/libro1/pagina4.png',  // Pagina 4
    'img/libro1/pagina5.png',  // Pagina 5
    'img/libro1/pagina6.png',  // Pagina 6
    'img/libro1/pagina7.png',  // Pagina 7
    'img/libro1/pagina8.png',  // Pagina 8
    'img/libro1/pagina9.png',  // Pagina 9
    'img/libro1/pagina10.png', // Pagina 10
    'img/libro1/pagina11.png', // Pagina 11
    'img/libro1/pagina12.png', // Pagina 12
    'img/libro1/pagina13.png', // Pagina 13
    'img/libro1/pagina14.png', // Pagina 14
    'img/libro1/pagina15.png', // Pagina 15
];

// Funzione per caricare una pagina specifica con animazione
function caricaPagina(numeroPagina, direzione = 'nessuna') {
    // Se un'animazione è già in corso, non fare nulla
    if (animazioneInCorso) {
        console.log('Animazione già in corso, attendi...');
        return;
    }
    
    // Ottengo l'elemento immagine dalla pagina
    const img = document.getElementById('paginaLibro');
    
    // Verifico che il numero di pagina sia valido
    if (numeroPagina >= 1 && numeroPagina <= pagineLibro.length) {
        // Impedisco nuove animazioni mentre questa è in corso
        animazioneInCorso = true;
        
        // Salvo la pagina corrente prima di cambiare
        const vecchiaPagina = paginaCorrente;
        
        // Aggiorno la variabile globale
        paginaCorrente = numeroPagina;
        
        // Log per debug
        console.log(`Sfogliando dalla pagina ${vecchiaPagina} alla pagina ${numeroPagina} di ${pagineLibro.length}`);
        
        // Eseguo l'animazione di sfogliatura in base alla direzione
        animaSfogliatura(img, pagineLibro[numeroPagina - 1], direzione, () => {
            // Callback eseguita quando l'animazione termina
            aggiornaTitolo();
            animazioneInCorso = false;
        });
    } else {
        console.error('Numero di pagina non valido!');
        animazioneInCorso = false;
    }
}

// Funzione per animare l'effetto di sfogliatura
function animaSfogliatura(img, nuovaSrc, direzione, callback) {
    // Ottengo l'indicatore di caricamento
    const loadingIndicator = document.querySelector('.loading-indicator');
    
    // Rimuovo tutte le classi di animazione precedenti
    img.classList.remove('page-flip-right', 'page-flip-left', 'page-enter-right', 'page-enter-left');
    
    // Forzo un reflow per assicurarmi che le classi siano rimosse
    void img.offsetWidth;
    
    if (direzione === 'avanti') {
        // Mostro l'indicatore di caricamento
        loadingIndicator.style.display = 'block';
        
        // Animazione per pagina successiva (sfoglia a destra)
        img.classList.add('page-flip-right');
        
        // Dopo che la pagina è "uscita", cambio l'immagine e la faccio entrare
        setTimeout(() => {
            img.src = nuovaSrc;
            img.classList.remove('page-flip-right');
            void img.offsetWidth; // Forzo reflow
            img.classList.add('page-enter-right');
            
            // Rimuovo la classe di entrata dopo l'animazione
            setTimeout(() => {
                img.classList.remove('page-enter-right');
                loadingIndicator.style.display = 'none'; // Nascondo l'indicatore
                callback();
            }, 600);
        }, 800);
    } else if (direzione === 'indietro') {
        // Mostro l'indicatore di caricamento
        loadingIndicator.style.display = 'block';
        
        // Animazione per pagina precedente (sfoglia a sinistra)
        img.classList.add('page-flip-left');
        
        // Dopo che la pagina è "uscita", cambio l'immagine e la faccio entrare
        setTimeout(() => {
            img.src = nuovaSrc;
            img.classList.remove('page-flip-left');
            void img.offsetWidth; // Forzo reflow
            img.classList.add('page-enter-left');
            
            // Rimuovo la classe di entrata dopo l'animazione
            setTimeout(() => {
                img.classList.remove('page-enter-left');
                loadingIndicator.style.display = 'none'; // Nascondo l'indicatore
                callback();
            }, 600);
        }, 800);
    } else {
        // Nessuna animazione (caricamento iniziale)
        img.src = nuovaSrc;
        callback();
    }
}

// Funzione per andare alla pagina successiva (freccia destra)
function paginaSuccessiva() {
    // Verifico se non sono all'ultima pagina
    if (paginaCorrente < pagineLibro.length) {
        // Vado alla pagina successiva con animazione di sfogliatura in avanti
        caricaPagina(paginaCorrente + 1, 'avanti');
    } else {
        // Se sono all'ultima pagina, torno alla prima con animazione circolare
        console.log('Tornato alla prima pagina con animazione circolare');
        caricaPagina(1, 'avanti');
    }
}

// Funzione per andare alla pagina precedente (freccia sinistra)
function paginaPrecedente() {
    // Verifico se non sono alla prima pagina
    if (paginaCorrente > 1) {
        // Vado alla pagina precedente con animazione di sfogliatura all'indietro
        caricaPagina(paginaCorrente - 1, 'indietro');
    } else {
        // Se sono alla prima pagina, vado all'ultima con animazione circolare
        console.log('Andato all\'ultima pagina con animazione circolare');
        caricaPagina(pagineLibro.length, 'indietro');
    }
}

// Funzione per aggiornare il titolo con la pagina corrente
function aggiornaTitolo() {
    const titolo = document.querySelector('h1');
    if (titolo) {
        titolo.textContent = `Star Wars: Death Star - Pagina ${paginaCorrente}/${pagineLibro.length}`;
    }
}

// Funzione che viene eseguita quando la pagina è completamente caricata
window.onload = function() {
    // Carico la prima pagina per impostazione predefinita
    caricaPagina(1);
    
    // Aggiungo event listener per la freccia destra (pagina successiva)
    const frecciaDestra = document.querySelector('.Riga .Pulsante img[alt="Freccia destra"]');
    if (frecciaDestra) {
        frecciaDestra.parentElement.addEventListener('click', paginaSuccessiva);
    }
    
    // Aggiungo event listener per la freccia sinistra (pagina precedente)
    const frecciaSinistra = document.querySelector('.Pulsante img[alt="Freccia sinistra"]');
    if (frecciaSinistra) {
        frecciaSinistra.parentElement.addEventListener('click', paginaPrecedente);
    }
    
    // Aggiungo supporto per i tasti freccia della tastiera
    document.addEventListener('keydown', function(evento) {
        if (evento.key === 'ArrowRight') {
            paginaSuccessiva();
        } else if (evento.key === 'ArrowLeft') {
            paginaPrecedente();
        }
    });
    
    console.log('Navigazione libro inizializzata. Usa le frecce o i pulsanti per navigare.');
};