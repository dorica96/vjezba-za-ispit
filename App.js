import React, { Component } from 'react';  // Uvozim React i Component iz React biblioteke
import SearchBar from './SearchBar';      // Uvozim SearchBar
import UserInfo from './UserInfo';        // Uvozim UserInfo 
import './App.css';                       // Uvozim CSS 

class App extends Component {
  // Konstruktor se koristi za inicijalizaciju stanja i vezanje metoda
  constructor(props) {
    super(props); //Pozivanjem ovog osiguravam da se taj konstruktor roditeljske klase izvrši prije nego što se izvrši kod unutar našeg konstruktora. Zanci da se prvo ucita component tj da se odradi life ciklus komponente i onda se izvrsi ovo. (didMount - to)
    this.state = {
      user: null,
      error: null,
    }; // pocetno stanje user (korisnički podaci) i error (poruka o grešci), znaci da trenutno nema ni podataka ni greške jer je sve prazno
    // vezem podatke na trenutni objekt, dakle to se stvara pomocu constructora, novi objekt, tj kad pretrazujem 
    this.fetchUserData = this.fetchUserData.bind(this); //koristim bind zato sto se mora azurirati sve kada se stvori novi objekt novim pretrazivanjem, zapravo time mijenjam stanje (setState) komponente
  }

  // Metoda za dohvaćanje korisničkih podataka s GitHub API-ja
  fetchUserData(username) {
    var self = this; // Sprema trenutnu instancu komponente za kasniju upotrebu unutar then/catch blokova
    // Dohvaćamo podatke s GitHub API-ja
    fetch('https://api.github.com/users/' + username)
      .then(function(response) {
        // Provjeravamo je li odgovor uspješan
        if (!response.ok) {
          throw new Error('User not found'); // Ako nije, bacamo grešku
        }
        return response.json(); // Ako je uspješan daje odgovor u JSON formatu
      })
      .then(function(data) {
        // Ažuriramo stanje s dohvaćenim korisničkim podacima i poništavamo grešku
        self.setState({ user: data, error: null });
      })
      .catch(function(error) {
        // U slučaju greške, ažuriramo stanje s porukom o grešci i poništavamo korisničke podatke
        self.setState({ error: error.message, user: null });
      });
  }

  // Metoda za renderiranje komponente
  render() {
    return (
      <div className="App">
        <h1>GitHub User Search</h1>
        {/* Prosljeđujemo fetchUserData metodu kao prop onSearch u SearchBar komponentu */}
        <SearchBar onSearch={this.fetchUserData} />
        {/* Ako postoji greška, prikazujemo je */}
        {this.state.error && <p>{this.state.error}</p>}
        {/* Ako postoje korisnički podaci, prosljeđujemo ih UserInfo komponenti */}
        {this.state.user && <UserInfo user={this.state.user} />}
      </div>
    );
  }
}

export default App; // Izvozimo App komponentu kao zadanu komponentu modula