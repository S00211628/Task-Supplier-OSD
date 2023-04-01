import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AWSAuthService } from 'src/app/Services/awsauth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  email!:string;
  verifyForm!:FormGroup;

  constructor(private _activatedRoute:ActivatedRoute, private _authService:AWSAuthService) { }

  ngOnInit(): void {
    this.verifyForm = new FormGroup({
      code: new FormControl(null, Validators.required)
    });

    this._activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
    })

  }

 
  get code(){
    return this.verifyForm.get('code').value
  }

  get codeErrors(){
    return this.verifyForm.get('code')
  }


  onSubmit(){
    this._authService.confirmRegistration(this.email, this.code);
  }

}

