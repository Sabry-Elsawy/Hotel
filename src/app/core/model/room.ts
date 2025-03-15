export interface IRoom {
    capacity: number;
    createdAt: string;
    createdBy: {
      userName: string;
    };
    discount: number;
    images: string[];
    price: number;
    roomNumber: string;
    updatedAt: string;
    _id: string;
    isBooked?:boolean;
    facilities: IFacility[];
}
export interface IFacility {
  _id: string;
  name: string;
}
