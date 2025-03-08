export interface IAds {
    _id: string;
    createdAt: string;
    createdBy: { userName: string; _id: string };
    isActive: boolean;
    room: {
      capacity: number;
      discount: number;
      facilities: string[];
      images: string[0];
      price: number;
      roomNumber: string;
      updatedAt: string;
    };
}
