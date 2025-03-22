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
    isFav?: boolean;
}
export interface IFacility {
  _id: string;
  name: string;
}


export interface IRoomReview {
  _id: string;
  room: {
    _id: string;
    roomNumber: string;
  };
  user: {
    _id: string;
    userName: string;
    profileImage: string;
  };
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}
