import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  contentToChange: string = '';

  constructor() {}
}
