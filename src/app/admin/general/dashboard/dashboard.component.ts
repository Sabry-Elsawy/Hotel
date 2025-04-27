import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../core/service/admin/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardData } from '../../../core/model/admin/dashboard-data';
import {ChartData, ChartType, ChartOptions, Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  dashboardData!:DashboardData;
  chart:any=[];
  usersAndAdminChart:any=[];
  overallChart:any=[];
  facilitiesChart:any=[];
  usersCount:number=0;
  AdminCount:number=0;
  pendingBookings:number=0;
  completedBookings:number=0;
  rooms: number = 0;
  facilities: number = 0;
  ads: number = 0;

  constructor(private _DashboardService:DashboardService , private _NgxSpinnerService:NgxSpinnerService){
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getDashboardData();
  }


  getDashboardData():void{
    this._NgxSpinnerService.show();
    this._DashboardService.getDashboardData().subscribe({
      next:(response)=>{
        console.log(response);
        this.dashboardData=response.data;
        this.usersCount=this.dashboardData.users.user;
        this.AdminCount=this.dashboardData.users.admin
       this.pendingBookings=this.dashboardData.bookings.pending;
       this.completedBookings=this.dashboardData.bookings.completed;
       this.rooms = response.data.rooms;
       this.facilities = response.data.facilities;
       this.ads = response.data.ads;
        this.initializeCharts()
      },
      error:(err)=>{
        console.log(err);
        this._NgxSpinnerService.hide();
      },
      complete:()=>{
        this._NgxSpinnerService.hide();
      }
    })
  }

  initializeCharts(){
    this.createUsersChart();
    this.createBookingChart();
    this.createFacilitiesChart();
    this.createOverallChart();
  }

  createBookingChart() {
    this.chart = new Chart('bookingChart', {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'Completed'],
        datasets: [{
          label: 'Bookings',
          data: [this.pendingBookings, this.completedBookings],
          backgroundColor: ['#3252DF', '#FF498B']
        }]
      },
      options: {
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 2000,
          easing: 'easeInOutQuart'
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  createUsersChart() {
 this.usersAndAdminChart=new Chart('usersChart',{
  type:'bar',
  data:{
    labels:['Users' , 'Admins'],
    datasets:[
      {
        label:'Count',
        data:[this.usersCount, this.AdminCount],
        backgroundColor: ['#3252DF', '#FF498B'],
        borderRadius: 8
      }
    ]
  },
  options:{
    animation:{
      delay: (context) => context.dataIndex * 300,
      duration: 1000,
      easing: 'easeInOutQuart'
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
 });
}


createFacilitiesChart() {
  this.facilitiesChart = new Chart('facilitiesChart', {
    type: 'pie',
    data: {
      labels: ['Rooms', 'Facilities'],
      datasets: [{
        data: [this.rooms, this.facilities],
        backgroundColor: ['#3252DF', '#FF498B'],
        borderWidth: 1
      }]
    },
    options: {
      animation: {
        animateScale: true,
        animateRotate: true,
        duration: 1500
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

createOverallChart() {
  this.overallChart = new Chart('overallChart', {
    type: 'radar',
    data: {
      labels: ['Users', 'Admins', 'Rooms', 'Facilities', 'Ads', 'Pending Bookings', 'Completed Bookings'],
      datasets: [{
        label: 'Statistics',
        data: [
          this.usersCount,
          this.AdminCount,
          this.rooms,
          this.facilities,
          this.ads,
          this.pendingBookings,
          this.completedBookings
        ],
        backgroundColor: 'rgba(50, 82, 223, 0.2)',
        borderColor: '#3252DF',
        pointBackgroundColor: '#FF498B',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3252DF'
      }]
    },
    options: {
      animation: {
        duration: 2000
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true
        }
      }
    }
  });
}

}
