import { IImage } from "../image/image.interface";

export interface IHotel {
  hotelID?: number;
  hotelName: string;
  categoria?: number;
  precio: number;
  createdAt?: Date;
  updatedAt?: Date;

  Image?: IImage[];
}
