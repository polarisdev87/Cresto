import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/index';
import { Store } from '@ngrx/store';
import { IRootState } from '../../../store/reducers';
import { getAssets } from '../store/selectors/assets.selector';

@Component({
  selector: 'app-backoffice-header',
  templateUrl: './backoffice-header.component.html',
  styleUrls: ['./backoffice-header.component.sass']
})
export class BackofficeHeaderComponent implements OnInit {
  public logo = 'assets/images/backoffice-logo.png';
  public assets$!: Observable<any>;

  @Output() public onOpen: EventEmitter<any> = new EventEmitter();
  public constructor(
    private _store: Store<IRootState>,
  ) { }

  public dropDownSidebar() {
    this.onOpen.emit();
  }
  public ngOnInit() {
    this.assets$ = this._store.select(getAssets);
  }
}
