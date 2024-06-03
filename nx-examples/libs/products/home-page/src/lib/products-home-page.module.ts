import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedProductStateModule } from '@nx-example/shared/product/state';

import { HomePageComponent } from './home-page/home-page.component';
import { PokedexService } from './home-page/services/pokedex.service';
import { HttpClientModule } from '@angular/common/http';
import { LoggerService } from './home-page/services/logger/logger.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedProductStateModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: HomePageComponent,
      },
    ]),
  ],
  providers: [PokedexService, LoggerService],
  declarations: [HomePageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsHomePageModule {}
