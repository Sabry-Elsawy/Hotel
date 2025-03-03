import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  hidepass:boolean = true;
  profileImage = signal<string | null>(null);
  onFileSelected(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  // removeProfileImage(event : Event){
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.profileImage.set(null);
  // }
  toggleSee(){
    this.hidepass = !this.hidepass;
  }

}
