import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideToastr } from "ngx-toastr";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
    provideToastr(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'goty-35ebb',
          appId: '1:833159588929:web:7d0f137f5bd9230b832ac0',
          storageBucket: 'goty-35ebb.appspot.com',
          apiKey: 'AIzaSyB62pUlgZBn7LtKdOyPkHlsnHM6MiRaYuM',
          authDomain: 'goty-35ebb.firebaseapp.com',
          messagingSenderId: '833159588929',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
