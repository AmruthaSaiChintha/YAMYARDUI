import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm!: FormGroup;
  myloginform!:FormGroup;

  private userposturl="https://localhost:44387/api/Users";
 
  registermodel!:FormGroup;
  constructor(private http:HttpClient,private fb:FormBuilder) { }


  postuser(data:any):Observable<any>
  {
    return this.http.post(this.userposturl,data);
  }
  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      role:['']
    });

    this.myloginform=this.fb.group({
     email:['',Validators.required],
     password:['',Validators.required]
    })
    document.addEventListener('DOMContentLoaded', () => {
      const signInButton = document.querySelector('.sign_in');
      const btn = document.querySelector('.btn');

      signInButton?.addEventListener('click', () => {
          const login = document.querySelector('.login');
          const welcome = document.querySelector('.welcome');
          const signUp = document.querySelector('.sign_up');
          const buttons = document.querySelectorAll('.btn');

          login?.classList.add('active');
          welcome?.classList.add('active');
          signInButton?.classList.add('active');
          buttons.forEach(btn => btn.classList.add('active'));
          signUp?.classList.add('active');
      });

      btn?.addEventListener('click', () => {
          const login = document.querySelector('.login');
          const welcome = document.querySelector('.welcome');
          const signUp = document.querySelector('.sign_up');
          const buttons = document.querySelectorAll('.btn');
          const signInButton = document.querySelector('.sign_in');

          login?.classList.remove('active');
          welcome?.classList.remove('active');
          signInButton?.classList.remove('active');
          buttons.forEach(btn => btn.classList.remove('active'));
          signUp?.classList.remove('active');
      });
    });
}

loginFormSubmit() {
  console.log("Hello")
  console.log(this.loginForm.value,"FormValues");
    this.postuser(this.loginForm.value).subscribe(response => {
      console.log('Response:', response);
    }, error => {
      console.error('Error:', error); 
    });
}

getallusers(data:any):Observable<any>
{
  return this.http.get(this.userposturl);
}
myformlogin()
{
  console.log("login sucessful");
  this.getallusers(this.myloginform.value).subscribe(response=>
    {
      console.log('response:', response);
    })
}

}
