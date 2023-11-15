# 360 Feedback tool

## Over de feedback tool

Het is een webapplicatie om teamleden (anoniem) antwoord te laten
geven op vragen rond hun project, zoals hun eigen functioneren als het functioneren van collega's.

## Waaruit bestaat de webapplicatie?

Deze repository bevat een Flask & React applicatie met: 
- Een database
- De Flask server
- De React JS server
- De React Native app

## Hoe de webapplicatie te starten? - Flask

Om Flask te kunnen starten zullen eerst de Flask packages 
moeten worden geïnstalleerd. 

In requirements.txt staan alle benodigde packages 
om de code succesvol te draaien. Ze zijn gemakkelijk
te installeren via pip.

Om problemen met versies voorkomen, wordt aangeraden om
een virtual environment te maken en daar de modules in te installeren:  
```
pip install virtualenv
virtualenv venv
.\venv\sripts\activate
pip install -r requirements.txt
```

Om de applicatie te starten: 
``` 
.\venv\sripts\activate
python app.py
```

De code is geschreven in Python 3.11.1

## Hoe de webapplicatie te starten? - React JS

Om React JS te kunnen starten zullen eerst de packages 
moeten worden geïnstalleerd. 

In requirements.txt staan alle benodigde packages 
om de code succesvol te draaien. 

Om de applicatie te starten: 
``` 
cd frontend
npm start
```

## Hoe in te loggen? Inloggegevens:

Er kan als beheerder ingelogd worden met de volgende inloggegevens: 
```
Gebruikersnaam: ?????@?????.com 
Wachtwoord: test
```
Er kan als teamlid ingelogd worden met de volgende inloggegevens:
```
Gebruikersnaam: ?????@?????.com 
Wachtwoord: test
```

## Hoe een nieuw account aan te maken?

De webapplicatie omvat een signup pagina waarop 
teamleden een nieuw account kunnen aanmaken.

## Structuur

De Model-View-Controller (MVC) structuur is gebruikt en opgesplitst in een backend folder (Flask) en een frontend folder (React JS).
- Model bestanden zitten in de backend folder in de folder models
- Controller bestanden zitten in de backend folder in de folder controllers en in de folder routes
- View bestanden zitten in de frontend folder in de folder components en in de folder pages
- View bestanden zitten ook in de mobile folder (React Native) voor op smartphones

## Ontwikkelaars van de webapplicatie

- Mees Pols, PHP Developer
- Ruben de Ruijter, PHP Intern
- Ruben Voogt, PHP Intern
- Anant Singh, Junior Intern

## Bronnen

- ChatGPT, versie GPT-3, ontwikkeld door OpenAI, gebruikt als hulpmiddel bij het programmeren
- Link naar [website](https://github.com/Maarten-vd-Sande/voorbeeldRepo) gebruikt als voorbeeld voor deze readme.md
