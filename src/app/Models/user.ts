
export class User{
    id:number;
    fname: string;
    lname: string;
    phoneno: number;
    password: string;
    address: string;
    photourl: string;

    constructor(id:number,fname:string,lname:string,
        phoneno:number,password:string,address:string,photourl:string){
        this.id=id;
        this.fname=fname;
        this.lname=lname
        this.phoneno=phoneno;
        this.password=password;
        this.address=address;
        this.photourl=photourl;
    }

}
export class RegisterUser {
    fname: string;
    lname: string;
    phoneno: number;
    password: string;
    address: string;
    photourl: string;

    constructor(fname: string, lname: string, phoneno: number, password: string) {
        this.fname = fname;
        this.lname = lname;
        this.phoneno = phoneno;
        this.password = password;
    }
}
export class LoginData{
    phoneno:number;
    password:string;

    constructor(phoneno:number,password:string){
        this.phoneno=phoneno;
        this.password=password;
    }
}
