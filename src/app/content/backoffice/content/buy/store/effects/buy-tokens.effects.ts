import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import {
  BUY_TOKENS_REQUEST, BuyTokensFail, BuyTokensRequest,
  BuyTokensSuccess, CALCULATE_SUMM_REQUEST, CalculateSumFail, CalculateSumRequest, CalculateSumSuccess
} from '../actions/buy-tokens.action';
import { PopupComponent } from '../../popup/popup.component';
import { WalletsService } from '../../../../../../shared/services/wallets.service';
import { LocalStorageService } from '../../../../../../shared/services/localStorage.service';
@Injectable()
export class BuyTokensEffects {

  @Effect()
  public calculateToken$: Observable<Action> = this.actions$
    .ofType(CALCULATE_SUMM_REQUEST).pipe(
      map((action: CalculateSumRequest) => action.payload),
      switchMap((data: CalculateTokensSum) => this._walletsService.calculateTokens(data).pipe(
        map((res: TokenPrice) => new CalculateSumSuccess(res)),
        catchError((err: Error) => {
          // tslint:disable-next-line
          console.log(err);
          return of(new CalculateSumFail(err));
        })
      )),
  );

  @Effect()
  public buyTokens$: Observable<Action> = this.actions$
    .ofType(BUY_TOKENS_REQUEST).pipe(
      map((action: BuyTokensRequest) => action.payload),
      switchMap((data: CalculateTokensSum) => this._walletsService.buyTokens(data).pipe(
        map((res: any) => new BuyTokensSuccess(res)),
        tap(() => {
          const clickId = this._localStorageService.getItem('clickId');
          const esubId = this._localStorageService.getItem('esubId');
          const currency = this._localStorageService.getItem('buy_currency');
          const price = this._localStorageService.getItem('buy_price');
          const priceUSD = this._localStorageService.getItem('buy_price_usd');
          if (clickId && currency && price) {
            const pixel = document.createElement('img');
            const url = `https://biggi.co/api/v4/trackconversion/XFfqsyRjCD/?clickId=${clickId}&currency=${currency}&amount=${price}`;
            pixel.src = url;
            document.body.appendChild(pixel);
          }
          if (esubId && priceUSD) {
            const pixelBitcomo = document.createElement('img');
            const url = `https://notify.bitcomo.com/aln/?esub=${esubId}&revenue=${priceUSD}`;
            pixelBitcomo.src = url;
            document.body.appendChild(pixelBitcomo);
          } 
          alert('Success');
        }),
        catchError((err: Error) => {
          this._dialog.open(PopupComponent, {
            data: {
              iconClose: 'icon-close',
              iconClass: 'icon-Exclamation',
              message: 'Error: ' + err.message,
              btnClass: '',
              btnTextContent: 'Deposit BTC'
            }
          });
          // tslint:disable-next-line
          console.log(err);
          return of(new BuyTokensFail(err));
        })
      )),
  );

  public constructor(
    private actions$: Actions,
    private _walletsService: WalletsService,
    private _localStorageService: LocalStorageService,
    private _dialog: MatDialog,
  ) {
  }
}
