import { Component, OnInit } from '@angular/core';
import { Coderror } from 'src/app/core/enum/coderror';
import { IHotel } from 'src/app/models/hotel';
import { ApiService } from 'src/app/services/service/apiservice.service';
import { HotelesService } from '../../services/hoteles'

@Component({
  selector: 'app-lista-hoteles',
  templateUrl: './lista-hoteles.component.html',
  styleUrls: ['./lista-hoteles.component.css'],
  providers: [HotelesService, ApiService]
})
export class ListaHotelesComponent implements OnInit {

  public hoteles: IHotel[] = [];
  public error: string = 'A ocurrido un error interno';

  constructor(
    private _hotelesService: HotelesService
  ) { }

  ngOnInit(): void {
    this.getHotels();
  }

  public async getHotels(){
    let result = await this._hotelesService.getHotel();
    if(result.code == Coderror.Exitoso){
      this.hoteles = result.hotels;
    } else {
      this.error = result.mensaje;
    }
  }

}
