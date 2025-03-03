import { Injectable } from '@angular/core';
export const RegxUserName: RegExp = /^[a-zA-Z]+[0-9]+$/;
export const RegxPhoneNumber: RegExp = /^\d+$/;
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
}
