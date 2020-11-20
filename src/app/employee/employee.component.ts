import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../services/common.service';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from '../form-modal/form-modal.component';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  employeeList: any = [];
  page = 1;
  pageSize = 10;
  closeResult = '';
  previousPage: any;
  total: any;
  searchKeyword: any;
  
  constructor(private commonService: CommonService,private modalService: NgbModal) { }

  ngOnInit() {
    this.getEmployees();
  }

  openFormModal(id) {
    //console.log("employee"+id);
    const modalRef = this.modalService.open(FormModalComponent);
    modalRef.componentInstance.id = id;

    modalRef.result.then((result) => {
      //console.log(result);
      this.getEmployees();
    }).catch((error) => {
      console.log(error);
    });
  }

  search(event: any) {    
    this.searchKeyword  = event.target.value;
    this.page = 1;
    this.getEmployees();
  }

  getEmployees() {
    //console.log('calling page:'+this.page);
    let param = {
      page : this.page,
      size : this.pageSize,
      keyword: this.searchKeyword,
    }
    this.commonService.getList(param).subscribe((data) => {
      console.log(data['data']['records']);
      this.employeeList = data['data']['records'];
      this.total = data['data']['total'];
    });
  }

  deleteEmployee(id) {
    let cond = confirm("Are you sure to delete record");
    console.log(id);
    if(cond) {
      let param = {
        id : id    
      }
      this.commonService.deleteEmployee(param).subscribe((data) => {
        console.log(data);        
        if(data['code'] == 200){
          this.page = 1;
          this.getEmployees();
        }else{
          console.log(data['message']);
        }
      })
    }    
  }

  pageChange(pageNo: number) {
    console.log("called pagination"+pageNo);
    this.previousPage = pageNo;      
    this.page = pageNo;
    this.getEmployees();    
  }
}
