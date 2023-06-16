import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  fresshnessList = ["Brand New","Second Hand","Refurnished"];
   productForm !: FormGroup;
   actionBtn : string = 'save'
   constructor(private formBuilder:FormBuilder,
    private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent>) { }


  ngOnInit(): void {
       this.productForm = this.formBuilder.group({
        productName : ['',Validators.required],
        category : ['',Validators.required],
        freshness : ['',Validators.required],
        price : ['',Validators.required],
        comment : ['',Validators.required]
       })
      
       console.log(this.editData);

       if(this.editData){
        this.actionBtn = 'Update'
        this.productForm.controls['productName'].setValue(this.editData.productName);
        this.productForm.controls['category'].setValue(this.editData.category);
        this.productForm.controls['freshness'].setValue(this.editData.freshness);
        this.productForm.controls['price'].setValue(this.editData.price);
        this.productForm.controls['comment'].setValue(this.editData.comment);
 
      }
  }

  addProduct(){
    console.log(this.productForm.value);
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProudct(this.productForm.value)
        .subscribe({
        next:(res)=>{
          alert('Product added successfully');
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert('Error while adding a product')
        }
         
        })
      }

    }

    else{
      this.updateProduct()
    }
  
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product Updated Successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record!!");
      }
    })
  }




}
