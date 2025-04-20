import { Component, OnInit, signal } from '@angular/core';
import { FacilitiesService } from '../../../core/service/admin/facilities.service';
import { IFacility } from '../../../core/model/room';
import { FormControl, FormGroup } from '@angular/forms';
 
@Component({
  selector: 'app-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrl: './manage-room.component.scss'
})
export class ManageRoomComponent implements OnInit {
 
 AllFacilities: IFacility[] = []; // Array to hold all facilities
selectedFiles: File[] = [];
images = signal<string[]>([]);  // array of base64 strings

constructor(private _FacilitiesService: FacilitiesService) {}

onFilesSelected(event: any) {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    this.selectedFiles = Array.from(files);
    const tempImages: string[] = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        tempImages.push(base64);

        // لما يخلص تحميل كل الصور، حدث الإشارة
        if (tempImages.length === this.selectedFiles.length) {
          this.images.set(tempImages);
        }
      };
      reader.readAsDataURL(file);
    });
  }
}

ngOnInit(): void {
  this.getFacility();
}
// ====================================

addRoomForm = new FormGroup({
  roomNumber:new FormControl(null),
  price:new FormControl(null),
  capacity:new FormControl(null),
  discount:new FormControl(null),
  facilities:new FormControl(null),
})

onSubmit(data :FormGroup) {
  console.log(data.value);
  console.log(this.selectedFiles);
  
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

}
