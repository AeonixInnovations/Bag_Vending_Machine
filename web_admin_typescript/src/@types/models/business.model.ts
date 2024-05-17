import {IUserModel} from './user.model';

export interface IBusinessModel {
  distance: any;
  avg_rate: any;
  _id?: string;
  name: string;
  phone_no: string;
  email: string;
  location: string;
  description: string;
  rate: number;
  photo: string[];
  status: string;
  user_details: IUserModel;
  category: string;
  lat: number;
  lon: number;
}
