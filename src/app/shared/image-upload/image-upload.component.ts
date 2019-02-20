import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Output, Input, EventEmitter, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit, OnChanges {

    public uploadForm: FormGroup;
    public fileBase64: string | ArrayBuffer = '#';
    public uploaded: boolean = false;

    public showDialog: boolean = false;

    @ViewChild('imageUpload') public imageUpload: ElementRef;

    @Input() public imagen: string | ArrayBuffer;
    @Input() public rounded: boolean = true;

    @Output() onFileUpload: EventEmitter<string | ArrayBuffer | null> = new EventEmitter<string | ArrayBuffer | null>();

    constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
        this.uploadForm = this.fb.group({
            file: null
        })
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.imagen) {
            this.fileBase64 = this.imagen;
            this.uploaded = true;
        }
    }

    public getFile(event) {
        let reader = new FileReader();

        if (event.target.files && event.target.files.length) {
            this.uploaded = true;
            const [files] = event.target.files;

            reader.onload = () => {
                this.fileBase64 = reader.result;
                this.onFileUpload.emit(this.fileBase64);
            }
            reader.readAsDataURL(files);
        }
        else {
            this.clearFile();
        }
    }

    public clearFile() {
        this.uploaded = false;
        this.fileBase64 = '';
        this.onFileUpload.emit(null);
    }

    public triggerUpload(): void {
        let el = this.imageUpload.nativeElement as HTMLElement;
        el.click();
    }

    public setDialog(status = true): void {
        this.showDialog = status;
    }

}
