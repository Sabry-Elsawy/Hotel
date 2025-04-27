import { Component, OnInit, signal } from '@angular/core';
import { FacilitiesService } from '../../../core/service/admin/facilities.service';
import { IFacility, IRoom } from '../../../core/model/room';
import { FormControl, FormGroup } from '@angular/forms';
import { ManageRommService } from '../../../core/service/admin/manage-romm.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../../../core/service/admin/rooms.service';
 
@Component({
  selector: 'app-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrl: './manage-room.component.scss'
})
export class ManageRoomComponent implements OnInit {
 
    AllFacilities: IFacility[] = []; // Array to hold all facilities
    selectedFiles: File[] = [];
    facilities: any[] | any = [];
    roomId:string='';
    roomData!:IRoom;
    isEditRoom:boolean=false;
 
 



 constructor(private _RoomsService:RoomsService,private _FacilitiesService: FacilitiesService,private _ActivatedRoute:ActivatedRoute,private _Router:Router , private _ManageRommService:ManageRommService , private _NgxSpinnerService:NgxSpinnerService) {
   _ActivatedRoute.paramMap.subscribe((params) => this.roomId = params.get('id') || '')
  if (this.roomId) {
    this.getRoomById(this.roomId);
    this.isEditRoom=true;
  }
   
 }



ngOnInit(): void {
  this.getFacility();
  
}

 
// ====================================

addRoomForm = new FormGroup({
  roomNumber:new FormControl<string | null>(null),
  price:new FormControl<number | null>(null),
  capacity:new FormControl<number | null>(null),
  discount:new FormControl<number | null>(null),
  facilities:new FormControl<any[] | null>(null),
})

onSubmit(data :FormGroup) {
  let myData=new FormData();
  myData.append('roomNumber',data.value.roomNumber);
  myData.append('price', data.value.price);
  myData.append('capacity', data.value.capacity);
  myData.append('discount', data.value.discount);

  if (data.value.facilities && data.value.facilities.length>0) {
    for ( const f of data.value.facilities) {
       if (f) {
        myData.append('facilities',f)
       }
      
    }
  }

  if (this.files.length>0) {
    for(const file of this.files){
      myData.append('imgs' , file ,file.name)
    }
  }
this._NgxSpinnerService.show();
if (this.roomId) {
  this._ManageRommService.editRoom(this.roomId,myData).subscribe({

  })
}
  this._ManageRommService.addRoom(myData).subscribe({
    next:(response)=>{
      console.log(response);
      this._Router.navigate(['/admin/management/rooms'])
      
    },
    error:(err)=>{
      console.log(err);
      this._NgxSpinnerService.hide();
    },
    complete:()=>{
      console.log('completed add room');
      this._NgxSpinnerService.hide();
    }
  })


  
}


getFacility() {
  let params={
    size:300,
    page:1
  }
  this._FacilitiesService.getAllFacilities(params).subscribe((res) => {
   // console.log(res);
    this.AllFacilities=res.data.facilities;
  }
  );
}

getRoomById(id:string):void{
  this._RoomsService.getRoomById(id).subscribe({
    next:(response)=>{
    //  console.log(response);
      this.roomData=response.data.room;
    },
    error:(err)=>{
      console.log(err);
      
    },
    complete:()=>{
      if (this.roomData?.facilities) {
        this.roomData.facilities.forEach((facility:any)=>{
          return this.facilities.push(facility)
        })
      }
          // Update to handle images array
          this.imgSrc = this.roomData?.images || [];
          // Add existing images to preview URLs
          this.previewUrls = [...this.imgSrc];

          this.addRoomForm.patchValue({
            roomNumber:this.roomData?.roomNumber,
            price: this.roomData?.price,
            capacity: this.roomData?.capacity,
            discount: this.roomData?.discount,
            facilities: this.roomData.facilities.map((facility: any) => facility._id)
          })
    }
  })
}
//=======================================================================================
files: File[] = [];
previewUrls: string[] = [];
imgSrc: string[] = []


onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    this.handleFiles(Array.from(input.files));
  }
}

handleFiles(files: File[]) {
  const imageFiles = files.filter(file => file.type.startsWith('image/'));
  this.files.push(...imageFiles);

  for (const file of imageFiles) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrls.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

onRemove(index: number) {
  // Remove from both files and previewUrls arrays
  if (index < this.files.length) {
    this.files.splice(index, 1);
  }
  this.previewUrls.splice(index, 1);
  
  // If it's an existing image, remove from imgSrc array
  if (index < this.imgSrc.length) {
    this.imgSrc.splice(index, 1);
  }
}
// =====================================================================
}



 
 