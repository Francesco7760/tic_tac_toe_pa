# tic_tac_toe_pa
# Progetto programmaizone avanzata: Tic Tac Toe Game
### DSCRIZIONE
L'obiettivo del progetto consiste nel realizzare in back-end che consenta di potere giocare una partita a tic-tac-toe.
Nel dettaglio il sistema prevede la possibilità di far interagire due utenti (autenticati mediante JWT) o un utente contro l’elaboratore (IA). Ci possono essere più partite attive in un dato momento. Un utente può allo stesso tempo partecipare ad una ed una sola partita.

# Funzionalità
### CREAZIONE PARTITA 
Il gioco consente, alla creazione di una nuova partita, di scegliere se sfidare un altro giocatore o fare una partita contro il computer. Inoltre sarà consentito avviare una partita solo se si ha a disposizione il credito necessario, nel caso di "giocatoreVSgiocatore" entrambi gli utenti devono necessariamente soddisfare il criterio sui crediti.

Nella specifico: 
- la partita costerà 0.75 se si decide di sfidare il computer 
- la partita consetrà 0.50 se a sfidarsi sono due persone

Ogni utente può avere aperta una solo partita alla volta, ciò vuol dire che al giocatore sono associate molte partita ma lui può giocare una sola, almeno che non abbandoni la partita corrente regalando la vittoria al avversario. 

### EFFETTUARE UNA MOSSA
Come noto, in tictactoe si gioca su una scacchiera quadrata di 9 caselle, quindi i giocatori possono fare la propria mossa inserendo X o O in una casella ancora libera.

Il singolo giocatore può effettuare una singola mossa per turno, soltando nella partita che ha in quel momento aperta ed ogni mossa costa 0.015 crediti.

 ### ABBANDONARE PARTITA  
 Il giocatore può scegliere di abbandonare la partita regalando la vittoria al avversario, questo porta ad aggiornamento del resoconto  su vittorie e sconfitte. 

### CONTROLLARE LO STATO DI UNA PARTITA
 Per ogni utente autenticato è disponibile la possibilità di controllare la situaizone di una singola partita.
 Basta specificare la partita desiderata e vengono mostrate varie info, quali:
 - giocatore che ha avviato la partita
 - avversario sfidato
 - se la partita è attiva 
 - se la partita è stata abbandonata
 - eventuale vincitore

### STORICO MOSSE DI UNA PARTITA
Un utente autenticato se vuole può contollare le mosse giocate dei due avversari in una partita. Inoltre può filtrare la ricerca selezionando mosse eseguite in un dato arco temporale; specificando data di inizio e di fine.

### CLASSIFICA GIOCATORI
Qualsiasi utente, anche non autentificato, può consultare la classifica dei giocatori ordinato per numero di vittorie.
Per ogni giocatore sono riportate:
- numero vittorie
- numero vittorie per abbandono del avversario
- numero vittorie contro computer
- numero sconfitte
- numero sconfitte per abbandono
- numero sconfitte contro computer

### RICARIA CREDITI
Un utente riconosciuto come amministratore, ha la posiibilità di aggiornare i crediti a disposizione dei singoli utenti.

riassunto funzionalità 
| Funzionalità | Ruolo  |
|--|--|
|  Creare nuova patita| User autenticato/Admin |
| Effettuare una nuova mossa|User autenticato/Admin|
| Controllare stato partita| User autenticato/Admin | 
| Storico mosse in una partita| User autenticato/Admin|
| Classfica giocatori| User non autenticato|
| Ricarica crediti| Admin|

# UML
### Diagrammi dei casi d'uso
![diagrammi casi d'uso](immagini/casi_usi.png)
### Diagrammi delle seguenze
#### crea nuova partita
![nuova partita](immagini/creanuovapartita.pngg)
#### effettuare una nuova mossa
![nuova mossa](immagini/nuovamossa.png)
#### controllare stato partita
![stato partita](immagini/statopartita.png)
#### storico mosse in un partita
![storico mosse](immagini/storicomosse.png)
#### classifica giocatori
![classifica giocatori](immagini/classifica.png)
#### ricarica crediti
![ricarica crediti](immagini/aggiungitoken.png)

# Rotte
|  Rotta| Tipo |Ruolo|autenticazione|
|--|--|--|--|
|/crepartita |POST|Utente/admin|JWT |
|/creanuovamossa|POST|Utente/admin|JWT|
|/abbandonapartita|GET|Utente/admin|JWT|
|/statopartita|POST|Utente/admin|JWT|
|/storicomosse|POST|Utente/admin|JWT|
|/clasifica|POST|Utente|NO|
|/aggiungitoken|POST|admin|JWT|

### descrizione rotte
A sequire verranno descritte la singole rotte nel dettaglio.
Tutti i raw data inviati dall'utente vengono validati nel middleware controllando i relativi tipi e le relazioni che intercorrono tra di essi. Inoltre, si controlla la presenza o meno di certi dati nel database Mysql ove necessario
--- ulteriori descrizioni sono riportate come commenti nel codice

#### /crepartita
Permette di creare una nuova partita specificando l'avversario ( contro altro utente o IA).
Alla creazione viene impostata la partita come attiva per entrambi i giocatori e al giocatore che invita è associato X come simbolo durante le partite.
Considerando i crediti, a fine operazione vengono decurtati del valore presabilito sui conti dei singili giocatori.

A questa richesta vengono richieste validazioni su:
- token JWT
- controllo se ai due giocatori sono associate  email valide ( ovvero presenti in database, il problema non si pone con IA )
- controllo se due giocatori hanno partite aperte
- controllo se i due giocatori hanno i token necessari
la mancanza di una delle precedenti validazioni evoca un errore specifico

Un esempio di payload da inserire nel body della richesta:
```
{
	"opponent": "user_4@email.com"
}
```
Un esempio di JWT token associato ad un utente che voglia creare una partita:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSJ9.7sE_UHiVOOyjCR6Yna-QSot4ZnkuSfJRT31hrHzjt8o
```

#### /creanuovamossa
Permette la creazione di una mossa chiedendo la posizione della casella nella scacchiera desiderata, considerando solo l'attuale partita attiva, prima della creazione il giocatore può controllare la situazione attuale del match cosi da decidere la miglior mossa da fare.
La mossa sarà consitita se sono rispettate le seguenti validazioni:
- token JWT
- se i giocatore ha partite attiveve su cui giocare
- controllare se ha i crediti necessari
- controllare se è i proprio turno durante il match
- e in fine se sia disponibile la casella della scacchiera voluta

Un esempio di payload da inserire nel body della richesta:
```
{
	"position": 5
}
```
Un esempio di JWT token associato ad un utente che voglia creare una partita:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJfNEBlbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifQ.p7KDjLl9Q1GdM-oADoNsdrJdS1rxDe6AeAALdwNA5po
```
#### /abbandonapartita
Il giocatore può abbandonare la sua attuale partita attiva.
La rotta sarà consitita se sono rispettate le seguenti validazioni:
- token JWT
- se al giocatore è associata un email valida
- controllare se il giocatore ha a disposizione una partita aperta

La rotta non necessita di specificare un paylod nel proprio body.
Un esempio di JWT token associato ad un utente che voglia creare una partita:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJfNEBlbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifQ.p7KDjLl9Q1GdM-oADoNsdrJdS1rxDe6AeAALdwNA5po
```
#### /statopartita
Il giocatore interroga il gioco per ottenere info su una singola partita.
La rotta sarà consitita se sono rispettate le seguenti validazioni:
- token JWT
- controlla se la partita richiesta è valida ( se presente in database )

Un esempio di payload da inserire nel body della richesta:
```
{
"game_id": 3
}
```
Un esempio di JWT token associato ad un utente che voglia creare una partita:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJfNEBlbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifQ.p7KDjLl9Q1GdM-oADoNsdrJdS1rxDe6AeAALdwNA5po
```
#### /storicomosse
Consente di ottenere tutte le mosse giocate in un match in un dato periodo specifico scegliendo se ottenere il risultato on formato Json o CSV.
La rotta sarà consitita se sono rispettate le seguenti validazioni:
- token JWT
- se la partita selezionata è valida ( se presente in database)

Un esempio di payload da inserire nel body della richesta:
```
{
	"game_id":2,
	"format": "text/json",
	"start_date":"2023-06-12",
	"finish_date":"2023-06-14"
}
```
Un esempio di JWT token associato ad un utente che voglia creare una partita:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJfMUBlbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifQ.HslW5X2gOh3T7yuPoduz-lMykiJr8Kb9tFXqT9iE85Q
```
#### /classifica
Permette di ottenere una classifica complete di tutti i giocatori presenti nel gioco, ordinandoli per vittorie potendo scegliere l'ordine, cresente o decrescente
La rotta sarà consitita se sono rispettate le seguenti validazioni:
- token JWT

Un esempio di payload da inserire nel body della richesta:
```
{
	"order":"desc"
}
```
La rotta è resa publica quindi non è necessario un token JWT.
#### /aggiungitoken
Rotta che permette di aggiungere crediti ai vari utenti del gioco, è una richiesta che necessita l'autentificazine come amministratore quindi anche di un token corrispondente.
La rotta sarà consitita se sono rispettate le seguenti validazioni:
- token JWT
- verificare se i privilegi del utente sono da amministratore
- controllare se l'email del giocatore a cui ricaricare crediti è valida
Un esempio di payload da inserire nel body della richesta:
```
{
	"opponent": "user_4@email.com",
	"token_add": 78
}
```
Un esempio di JWT token associato ad un utente che voglia creare una partita:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiJ9.FUQUVLm5oBvHuBDO8AYBtGz7NZOQhiH3FfLJcsvYNjQ
```



# Pattern utilizzati
### Singleton

Il Singleton è un design pattern creazionale che assicura di realizzare un'unica istanza di una certa classe, garantendo però l'accesso globale ad quella determinata istanza. 
Nel progetto è stato usato questo pattern per realizzare la connessione con il database garantendone l'unicità, risparmiando sulle risorse utilizzae dal sistema. 
Possiamo trovare l'implementazione del pattern sotto la directory **/components/singleton/**.

### Model - Controller

Model-Controller è un pattern architetturale adattato nel nostro caso del Model View Controller, poichè le specifiche del progetto si concentrano sullo sviluppo di un back-end.
Il sistema viene separato in due sottocomponenti lofiche:
- Model che gestisce dati ed eventuali operazioni su di loro 
- Controller che gestisce l'iterazoine con l'utente

Possiamo trovare l'implementazione del pattern sotto le directory **/components/model/** e **/components/controller**

### Chain of Responsability - middleware

La Chain of Responsability è un design pattern comportamentale che permette di far passare la richiesta lungo una catena di validatori. 
Ogni validatore prende una richiesta come argomento ed un riferimento al validatore successivo, se il controllo va a buon fine la richiesta sarà inoltrata al controllore successivo, altrimenti restituirà un errore.

Se vengo passati tutti i controlli la rischiesta può essere inoltrata al controller specifico.
Questo pattern è stato ustai per implemantare la catena di validatori associati ad ogni rotta.

Possiamo trovare l'implementazione del pattern sotto la directory **/components/middleware/** e **index.ts**.

### Factory Method

Il Factory Method è un design pattern creazionale che fornisce un'interfaccia per la creazione di oggetti in una super classe, ma permette alle sottoclassi di alterare il tipo di oggetti che saranno creati. 

Il pattern è stato utilizzato per la generazione dei messaggi di errore e di successo da ritornare al client.

Possiamo trovare l'implementazione del pattern sotto la directory **/components/factory/**.

# Avvio 
Per l'avvio del progetto è necessaria la presenza di Docker sulla propria macchina.
A seguire sarà necessario fare il download del repository, spostarsi nella cartella di progetto e dare il seguente comando:
```
docker compose build && docker compose up
```
# Test
Per l'esecuzione dei test è necessario importare il file **tictactoe_collection_requests.postman_collection.json**. 
Sarà necessario unirsi di token JWT generati su [JWT.IO](https://jwt.io/) con la chiave SECRET_KEY presente in .env.

Inoltre, durante il seeder del databases mysql saranna inseriti valori di prova per le tre tabelle utilizzate nel progetto, il valori sono stati creati con l'idea di potere testare il programma.



