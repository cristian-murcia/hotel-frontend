import { Injectable } from '@angular/core';
import { IRequest } from 'src/app/core/models/request.interface';
import { global } from '../../core/global';
import { ApiService } from 'src/app/services/service/apiservice.service';
import { Process } from 'src/app/core/enum/proceso.enum';
import { IHotelResponse } from '../../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelesService {

  public url: string;

  constructor(
    private _apiService: ApiService
  ) {
    this.url = global.url;
  }

  public async getHotel(): Promise<IHotelResponse> {
    let datos: IRequest = {
      proceso: Process.getHotels
    }
    let result = await this._apiService.getApiResponse<IRequest, IHotelResponse>(datos);
    return result;
  }


}
