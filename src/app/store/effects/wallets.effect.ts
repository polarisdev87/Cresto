import { WalletsService } from './../../shared/services/wallets.service';
import {
  WALLET_REQUEST,
  WalletRequest,
  WalletLoadSuccess,
  WalletLoadFail,
  AssetsLoadSuccess, AssetsLoadFail,
  ASSETS_REQUEST,
  ROUNDS_REQUEST,
  RoundsLoadSuccess,
  RoundsLoadFail,
  TransactionRequest,
  TransactionLoadFail,
  TransactionLoadSuccess,
  TRANSACTION_REQUEST
} from './../actions/wallets.action';
import { AclService } from '../../shared/services/acl.service';
import * as AclActions from '../actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class WalletsEffects {

  @Effect()
  public loadWallets$: Observable<Action> = this.actions$
    .ofType(WALLET_REQUEST).pipe(
      map((action: WalletRequest) => action.payload),
      switchMap((userId: string) => this._walletsService.getUserWallets(userId).pipe(
        map((data: any) => new WalletLoadSuccess(data)),
        catchError((err: Error) => {
          // tslint:disable-next-line
          console.log(err);
          return of(new WalletLoadFail(err));
        })
      )),
  );


  @Effect()
  public assetsWallets$: Observable<Action> = this.actions$
    .ofType(ASSETS_REQUEST).pipe(
      switchMap(() => this._walletsService.assets().pipe(
        map((data: any) => new AssetsLoadSuccess(data)),
        catchError((err: Error) => {
          // tslint:disable-next-line
          console.log(err);
          return of(new AssetsLoadFail(err));
        })
      )),
  );

  @Effect()
  public roundsWallets$: Observable<Action> = this.actions$
    .ofType(ROUNDS_REQUEST).pipe(
      switchMap(() => this._walletsService.rounds().pipe(
        map((data: any) => new RoundsLoadSuccess(data)),
        catchError((err: Error) => {
          // tslint:disable-next-line
          console.log(err);
          return of(new RoundsLoadFail(err));
        })
      )),
  );

  @Effect()
  public transactionWallets$: Observable<Action> = this.actions$
    .ofType(TRANSACTION_REQUEST).pipe(
      map((action: TransactionRequest) => action.payload),
      switchMap((userId: string) => this._walletsService.transaction(userId).pipe(
        map((data: any) => new TransactionLoadSuccess(data)),
        catchError((err: Error) => {
          // tslint:disable-next-line
          console.log(err);
          return of(new TransactionLoadFail(err));
        })
      )),
  );

  public constructor(
    private actions$: Actions,
    private _walletsService: WalletsService,
  ) { }
}
