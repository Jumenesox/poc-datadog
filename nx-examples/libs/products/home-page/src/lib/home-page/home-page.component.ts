import { Component, inject, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  getProducts,
  getProductsState,
  ProductsPartialState,
} from '@nx-example/shared/product/state';
import { Product } from '@nx-example/shared/product/types';
import '@nx-example/shared/product/ui';
import { PokedexService } from './services/pokedex.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoggerService } from './services/logger/logger.service';
// import { LoggerService } from './services/logger/logger.service';

@Component({
  selector: 'products-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  products: Observable<Product[]> = this.store.pipe(
    select(getProductsState),
    select(getProducts)
  );

  showPokemon = false
  pokemon: {tipo: string[]}
  private logService = inject(LoggerService);
  private pokedexService = inject(PokedexService);
  private router = inject(Router);
  constructor(private store: Store<ProductsPartialState>) {}

  ngOnInit(): void {
    const t1 = performance.now();
    this.pokedexService.getPokemons().subscribe({
      next: (success) => {
        const t2 = performance.now();
        console.log(success);
        if ((t2 - t1) / 1000 > 5) {
          this.logService.warn(
            'ATENÇÃO: Tempo decorrido na API Pokedex é maior do que o esperado: ' + (t2 - t1) / 1000,
            {}
          );
        } else {
          this.logService.info(
            'Sucesso na integração para a API Pokedex, tempo decorrido: ' +
              (t2 - t1) / 1000
          );
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.logService.error(
          `Erro durante a integração para a API Pokedex, detalhes: ${error.status} - ${error.message}`,
          {},
          error
        );
      },
    });
  }

  showPokemons(){
    this.showPokemon = true
  }
  forceError() {
    console.log('force error');
    this.router.navigate(['/rota-nao-existente']);
  }
}
