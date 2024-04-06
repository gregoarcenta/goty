import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IGame } from '../models/game.model';
import {
  DocumentReference,
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private firestore: Firestore = inject(Firestore);

  private gamesSubject$ = new BehaviorSubject<IGame[]>([]);

  get games$() {
    return this.gamesSubject$.asObservable();
  }

  constructor() {
    const gameCollectionReference = collection(this.firestore, 'games');

    (collectionData(gameCollectionReference) as Observable<IGame[]>).subscribe(
      (games) => {
        this.gamesSubject$.next(games);
      }
    );
  }

  async voteGame(idGame: string): Promise<void> {
    const docGameRef = doc(this.firestore, 'games', idGame);

    try {
      // Obtiene el documento
      const docGame = await getDoc(docGameRef);

      // Error si no existe el documento
      if (!docGame.exists()) throw new Error('Juego no encontrado');

      // Obtiene los datos del documento
      const game = docGame.data() as IGame;

      // Actualiza los votos del documento
      this.updateVoteGame(docGameRef, game.votos);
    } catch (error: any) {
      // Lanza el error
      throw new Error(error.message);
    }
  }

  private updateVoteGame(docGameRef: DocumentReference, currentVotes: number) {
    updateDoc(docGameRef, { votos: currentVotes + 1 });
  }
}
