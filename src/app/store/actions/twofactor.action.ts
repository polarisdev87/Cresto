import { Action } from '@ngrx/store';

export const VERIFY_TWOFACTOR = '[TFA] VERIFY_TWOFACTOR';
export const VERIFY_TWOFACTOR_SUCCESS = '[TFA] VERIFY_TWOFACTOR_SUCCESS';
export const VERIFY_TWOFACTOR_FAIL = '[TFA] VERIFY_TWOFACTOR_FAIL';

export const DELETE_TWOFACTOR = '[TFA] DELETE_TWOFACTOR';
export const DELETE_TWOFACTOR_SUCCESS = '[TFA] DELETE_TWOFACTOR_SUCCESS';
export const DELETE_TWOFACTOR_FAIL = '[TFA] DELETE_TWOFACTOR_FAIL';

export const TWOFACTOR_SETUP = '[TFA] TWOFACTOR_SETUP';
export const TWOFACTOR_SETUP_SUCCESS = '[TFA] TWOFACTOR_SETUP_SUCCESS';
export const TWOFACTOR_SETUP_FAIL = '[TFA] TWOFACTOR_SETUP_FAIL';


export class VerifyTwoFactor implements Action {
  public readonly type: string = VERIFY_TWOFACTOR;
  public constructor(public payload: { token: string }) {}
}

// tslint:disable-next-line: max-classes-per-file
export class VerifyTwoFactorSuccess implements Action {
  public readonly type: string = VERIFY_TWOFACTOR_SUCCESS;
  public constructor(public payload: boolean) {}
}

// tslint:disable-next-line: max-classes-per-file
export class VerifyTwoFactorFail implements Action {
  public readonly type: string = VERIFY_TWOFACTOR_FAIL;
  public constructor(public payload: Error) {}
}

// tslint:disable-next-line: max-classes-per-file
export class TwoFactorSetup implements Action {
  public readonly type: string = TWOFACTOR_SETUP;
}

// tslint:disable-next-line: max-classes-per-file
export class TwoFactorSetupSuccess implements Action {
  public readonly type: string = TWOFACTOR_SETUP_SUCCESS;
  public constructor(public payload: User) {}
}

// tslint:disable-next-line: max-classes-per-file
export class TwoFactorSetupFail implements Action {
  public readonly type: string = TWOFACTOR_SETUP_FAIL;
  public constructor(public payload: Error) {}
}


// tslint:disable-next-line: max-classes-per-file
export class DeleteTwoFactor implements Action {
  public readonly type: string = DELETE_TWOFACTOR;
  public constructor(public payload: {token: string}) {}
}

// tslint:disable-next-line: max-classes-per-file
export class DeleteTwoFactorSuccess implements Action {
  public readonly type: string = DELETE_TWOFACTOR_SUCCESS;
  public constructor(public payload: User) {}
}

// tslint:disable-next-line: max-classes-per-file
export class DeleteTwoFactorFail implements Action {
  public readonly type: string = DELETE_TWOFACTOR_FAIL;
  public constructor(public payload: Error) {}
}
