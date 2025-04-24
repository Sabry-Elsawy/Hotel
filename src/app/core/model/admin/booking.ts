export interface IBooking {
  createdAt: string;
  endDate: string;
  room: { _id: string; roomNumber: string };
  startDate: string;
  status: string;
  totalPrice: number;
  updatedAt: string;
  user: { _id: string; userName: string };
  _id: string;
}
