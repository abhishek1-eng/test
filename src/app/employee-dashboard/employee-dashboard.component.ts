import { EmployeeService } from './../Services/employee.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmployeeDetails } from '../Model/EmployeeDetails';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  EmployeeDetails!: FormGroup;
  EmployeeData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  //Myname:string="";
  //Myname!:string;
  //Mnum:number=0;
  //EmployeeDetailsObj:EmployeeDetails= new EmployeeDetails;
  EmployeeDetailsObj: EmployeeDetails = {} as EmployeeDetails;

  constructor(private fb: FormBuilder, private empservice: EmployeeService) {}

  ngOnInit(): void {
    this.postEmployeeDetails();
    this.getEmployeeDetails();
  }

  clickEmp(){
  //  this.EmployeeDetails.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  closeForm(){
    this.EmployeeDetails.reset();
  }

  postEmployeeDetails() {
    this.EmployeeDetails = this.fb.group({
      firstName: ['',[Validators.required,]],
      lastName: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      mobileNum: ['',[Validators.required,Validators.minLength(10)]],
      salary: ['',[Validators.required]],
    });
  }
  postData() {
    // this.Myname=this.EmployeeDetails.value.Fname;
    // this.Mnum=this.EmployeeDetails.value.Mobile;
    // console.log(this.Myname+ " "+this.Mnum);
    this.EmployeeDetailsObj.firstName = this.EmployeeDetails.value.firstName;
    this.EmployeeDetailsObj.lastName = this.EmployeeDetails.value.lastName;
    this.EmployeeDetailsObj.email = this.EmployeeDetails.value.email;
    this.EmployeeDetailsObj.mobileNum = this.EmployeeDetails.value.mobileNum;
    this.EmployeeDetailsObj.salary = this.EmployeeDetails.value.salary;
    //console.log(this.EmployeeDetailsObj);
    this.empservice.createEmployee(this.EmployeeDetailsObj).subscribe(
      (data: EmployeeDetails) => {
        console.log(data);
        alert('Employee Details Added Suscessfully');
        let ref=document.getElementById("cancle");
        ref?.click();
        this.EmployeeDetails.reset();
        this.getEmployeeDetails();
      },
      (err) => {
        alert('Something Went wrong');
      }
    );
  }

  getEmployeeDetails(){
    this.empservice.getEmployee().subscribe((data:EmployeeDetails)=>{
      this.EmployeeData=data;
      //console.log(this.EmployeeData);
    })
  }

  deleteEmp(emp:any){
    this.empservice.deleteEmployee(emp.id).subscribe((data:EmployeeDetails)=>{
      console.log(data);
      alert("Employee Record Succesfully Deleted");
      this.getEmployeeDetails();

    })
 }

 onEdit(data:any){
  this.showAdd=false;
  this.showUpdate=true;
  this.EmployeeDetailsObj.id=data.id;
  this.EmployeeDetails.controls['firstName'].setValue(data.firstName);
  this.EmployeeDetails.controls['lastName'].setValue(data.lastName);
  this.EmployeeDetails.controls['email'].setValue(data.email);
  this.EmployeeDetails.controls['mobileNum'].setValue(data.mobileNum);
  this.EmployeeDetails.controls['salary'].setValue(data.salary);

 }

 updateEmp(){
  this.EmployeeDetailsObj.firstName=this.EmployeeDetails.value.firstName;
  this.EmployeeDetailsObj.lastName = this.EmployeeDetails.value.lastName;
    this.EmployeeDetailsObj.email = this.EmployeeDetails.value.email;
    this.EmployeeDetailsObj.mobileNum = this.EmployeeDetails.value.mobileNum;
    this.EmployeeDetailsObj.salary = this.EmployeeDetails.value.salary;

    this.empservice.updateEmployee(this.EmployeeDetailsObj,this.EmployeeDetailsObj.id).subscribe((data:EmployeeDetails)=>{
      alert("Updated Record Sucessfully");
      let ref=document.getElementById("cancle");
      ref?.click();
    
      this.EmployeeDetails.reset();
      this.getEmployeeDetails();
    },
    err=>{
      alert("something Went  Wrong");
    }

    )
 }
}
