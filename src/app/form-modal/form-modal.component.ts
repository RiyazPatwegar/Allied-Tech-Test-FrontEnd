import { Component, OnInit, Input, EventEmitter, } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  @Input() id: number;
  myForm: FormGroup;
  employee : any;

  constructor(  public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private commonService: CommonService) {    
   }

   ngOnInit() {  
    this.createForm();

    let param = {
      id :this.id     
    }
    this.commonService.getEmployee(param).subscribe((data) => {
      console.log(data);     
      if(data['code'] !== 200){
        console.log(data['message']);
        return false;
      } 
      this.employee = data['data'];  
      this.myForm = this.formBuilder.group({
        id: this.employee.id,
        name: this.employee.name,
        address: this.employee.address,
        contact: this.employee.contact,
      });    
    })      
   }

   private createForm() {    
    console.log("inner of create form");
    console.log(this.employee);
    this.myForm = this.formBuilder.group({
      id: '',
      name: '',
      address: '',
      contact: '',
    });
  }

  private submitForm() {
    console.log(this.myForm.value);

    this.commonService.editEmployee(this.myForm.value).subscribe((data) => {
      if(data['code'] == 200){
        console.log(data);
        this.activeModal.close(this.myForm.value);
      }else{
        console.log(data['message']);
      }
    });    
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
