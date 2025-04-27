export interface DashboardData {
   rooms:number;
   facilities: number;
   bookings: {
       pending: number;
       completed: number;
    },
   ads: number;
   users: {
       user: number;
       admin: number;
    }
}
