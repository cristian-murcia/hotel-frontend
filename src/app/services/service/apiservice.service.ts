import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { global } from '../../core/global';
import { IRequest } from '../../core/models/request.interface';
import { IResponse } from '../../core/models/response.inrteface';
import { Coderror } from '../../core/enum/coderror';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = global.url;
  }

  /*
   * Realiza la petición inicial
   */
  public getData<U = any, T = any>(msg: U): Observable<T> {

    return this._http.post(this.url, { datos: msg }).pipe(
      map((body: any) => {
        return body.data as any;
      }),
      catchError((err) => {
        return of({
          coderror: Coderror.ErrorServer,
          msg: 'No fue posible consumir servicio el API',
          isErrorApp: true,
        } as any);
      })
    );
  }

  /**
   * Perform translation of the answer
   * @param context
   * @param translatedVariables
   */
  public async getApiResponse<
    T extends IRequest,
    U extends IResponse
  >(context: T): Promise<U> {
    try {
      const response = await this.getData<T, U>(context).toPromise();
      return {
        ...response,
      };
    } catch (error) {
      return {
        code: 900,
        mensaje: error.getMessage(),
      } as U;
    }
  }

}
