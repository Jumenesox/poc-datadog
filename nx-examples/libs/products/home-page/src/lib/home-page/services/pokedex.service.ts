import { Injectable } from '@angular/core'; // Importe o Injectable
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Adicione essa linha para tornar o serviço disponível em toda a aplicação
})
export class PokedexService {

  constructor(private http: HttpClient) { }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPokemons(): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/pokemson/');
  }
}