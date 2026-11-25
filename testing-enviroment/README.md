# PELL2.0-Automation-Testing

<img src="assets/286744824-962695d5-abe1-479e-a27b-954fb2808444.png" width="230"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <img src="assets/286744868-6bcb3657-f996-4a7e-8093-7608093e60ce.png" width="200">

Nell'ambito del consolidamento del portale PELL IP, la fase di testing delle sue funzionalità e il report dei suoi risultati è affidata al seguente strumento, raccolto in questa repository, che consente di automatizzare e standardizzare il processo.
Basandoci il framework Playwright per il testing e2e, è stato costruito il seguente strumento che comprende un set di test scritti in Javascript e un reporter, che salva i risultati dei test delle funzionalità su database SQLite.

I risultati dei test possono venire poi visualizzati tramite interfaccia web o classiche query da console.

## Getting started

1. Installare wampServer dal segeunte link: https://wampserver.aviatechno.net/ 
2. Sempre dalla pagina di wampServer installare i vari pacchetti Microsoft VC++ e Microsoft VC per il corretto funzionamento di wampServer
3. Avviare wampServer e accedere alla pagina phpMyAdmin: Dati di accesso: username: root, e lasciare il campo password vuoto
4. Creare un nuovo database dal nome “pell_ip_db”
5. Dal menu in alto selezionare importa e selezionare file di database presente in /assets/pell_ip_db.sql di questa repository
6. Installare node.js dal sito: https://nodejs.org/. Selezionare una versione > 18
7. Aprire il progetto con Visual Studio Code e scrivere il comando `npm install playwright`. Alternativamente seguire il prossimo punto
8. è consigliabile installare l'estensione di PlayWright per Visual Studio Code, e procedere all'installazione e alla configurazione del framework tramite esso.

    a. Cliccare nella barra di ricerca in alto -> Show and run commands -> Test: Install Playwright
9. Fatto ciò è tutto pronto per l’esecuzione del progetto. Basterà utilizzare il seguente comando per procedere all’esecuzione di un determinato caso di test: `npx playwright test e2e/UC1/UC1_TC1.spec.js --project=chromium --project=firefox --project=webkit`

## Parametri del framework Playwright utilizzabili per i test run

```shell
# mostra l'help del comando di esecuzione dei test
npx playwright test -h 

# esegue i/il test solo sul browser specificato/i
npx playwright test <dir> --project=<browser>

# mostra a video il browser con il test in esecuzione
npx playwright test <dir> --headed

# mostra a video il browser con l'inspector con breakpoint predefiniti
npx playwright test <dir> --debug
```

## Parametri custom utilizzabili per i test run
 
 è possibile parametrizzare le esecuzioni dei test dichiarando delle variabili d'ambiente che verrano lette dai test. Ad esempio per parametrizzare l'utente di login per i test

 ```powershell
 # powershell
 $env:EMAIL="test.region@pell.it"
 $env:PASSWORD="hidden"
 npx playwright test e2e/UC1/UC1_TC1.spec.js
 ```

```shell
# shell
EMAIL="test.admin@pell.it" PASSWORD="hidden" npx playwright test e2e/UC1/UC1_TC1.spec.js
```

infine le variabili dichiarate sono utilizzabili all'interno del codice javascript utilizzando, per esempio: `console.log(process.env.EMAIL)`

Di seguito un elenco di parametri dichiarabili con i possibili valori

```
EMAIL: string
PASSWORD : string
```

