export interface IRoom {
    capacity: number;
    createdAt: string;
    createdBy: {
      userName: string;
    };
    discount: number;
    images: string[0];
    price: number;
    roomNumber: string;
    updatedAt: string;
    _id: string;
}
