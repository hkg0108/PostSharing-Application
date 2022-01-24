import { AbstractControl } from "@angular/forms";
import { observable, Observable, Observer, of } from "rxjs";
import { promise } from "selenium-webdriver";

export const mimeType = (control:AbstractControl) :
Promise<{[key : string] : any}> | Observable<{[key : string] : any}>=>{
  if(typeof(control.value) === "string"){
    return of(null);
  }
  const file = control.value as File;
  const filereader = new FileReader();
  const myobserv = Observable.create((observer : Observer<{[key : string] : any}>)=>{
    filereader.addEventListener("loadend",()=>{
      const arr = new Uint8Array(filereader.result as ArrayBuffer).subarray(0,4);
      let header = "";
      let isvalid = false;
      for (let i=0 ; i< arr.length ; i++)
      {
        header += arr[i].toString(16);
      }
      switch(header){
        case "89504e47":
          isvalid = true;
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          isvalid = true;
          break;
        default :
          isvalid = false;
          break;
      }
      if(isvalid){
        observer.next(null);
      }else{
        observer.next({invalidMimeType : true});
      }
      observer.complete();
    });
    filereader.readAsArrayBuffer(file);
  });
  return myobserv;
};
