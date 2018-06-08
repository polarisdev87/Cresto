import { getStateData } from './../../../../store/selectors/wallets.selector';
import { CalculateWithdrawalFeeRequest, WithdrawalRequest, ClearWithdrawal } from './../../../../store/actions/withdrawal.action';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { getAuthUserId } from '../../../../store/selectors';
import { debounceTime, map } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { WalletService } from '../../wallet.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-withdrawal-modal',
  templateUrl: './withdrawal-modal.component.html',
  styleUrls: ['./withdrawal-modal.component.css']
})
export class WithdrawalModalComponent implements OnInit, OnDestroy {
  userId$: Observable<string>;
  withdrawalForm: FormGroup;
  withdrawalData: WithdrawalRes;
  error$: Observable<string>;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<StoreStates>,
    private _walletService: WalletService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this._store.select(getStateData('withdrawal')).subscribe((data: WithdrawalRes) => this.withdrawalData = data);

    this.error$ = this._store.select('withdrawal').pipe(map((data: any) => data.error));

    this.withdrawalForm = this._fb.group({
      cstt_address: ['', Validators.required],
      amount: [0, Validators.required]
    });

    this.userId$ = this._store.select(getAuthUserId);
    const amount$ = this.withdrawalForm.controls['amount'].valueChanges;

    this._walletService.calculateWithdrawalData(this.userId$,  amount$)
    .subscribe((data: CalculateFee) => {
      const { wallet_id } = this.data;
      this._store.dispatch(new CalculateWithdrawalFeeRequest({...data, wallet_id }));
    });
  }

  withdrawal() {
    this._walletService.withdrawal(this.userId$, of(this.withdrawalForm.value))
    .subscribe((data: WithdrawalBody) => this._store.dispatch(new WithdrawalRequest(data)));
  }

  ngOnDestroy() {
    this._store.dispatch(new ClearWithdrawal());
  }
}