import { Component, Injector, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from '@firebase/util';
import { BasePage } from 'src/app/base-page';
import { FileUploadService } from 'src/app/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent extends BasePage implements OnInit {

  patientsFiles: any[];
  patientsFilesUrls: any[];


  selectedFiles: FileList | undefined;
  currentFileUpload!: FileUpload;
  percentage!: number;
  patientId: string | null;

  constructor(injector: Injector, private uploadService: FileUploadService, private storage: AngularFireStorage, private _lightbox: Lightbox) {
    super(injector);

    this.patientId = this.activatedRoute.snapshot.paramMap.get('uid');
    this.patientsFiles = [];
    this.patientsFilesUrls = [];
  }

  ngOnInit(): void {
    this.uploadService.basePath = '/'+this.patientId || '';
    this.storage.storage.ref('/'+this.patientId).listAll().then((data) => {
      console.log(data)
      data.items.forEach((imgRef) => {
        this.displayImage(imgRef)
      });
    })
  } 

  open(index: number): void {
    // open lightbox
    console.log('in open function')
    this._lightbox.open(this.patientsFilesUrls, index);
  }

  displayImage(imageRef: any) {
    imageRef.getDownloadURL().then((url: any) => {
      // TODO: Display the image on the UI
      let data = {
        ref: imageRef,
        url
      }
      this.patientsFiles.push(data);

      const album = {
        src: url,
        caption: '',
        thumb: url
     };

      this.patientsFilesUrls.push(album);
      console.log(this.patientsFiles)
    }).catch((error: any) => {
      // Handle any errors
      console.log(error)
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.uploadService.basePath = '/'+this.patientId || 'default';
    if(this.selectedFiles) {
      const file = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
  
      if(file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage || 0);
          },
          error => {
            console.log(error);
          }
        );
      }

    }

  }
}
