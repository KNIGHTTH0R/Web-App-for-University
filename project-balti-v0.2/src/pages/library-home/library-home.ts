import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Gatepass } from '../../classes/gatepass';
import { Login } from '../login/login';
import { UserService } from '../../providers/user-service';
import { LibraryService } from '../../providers/library-service';
import { LibrarySearch } from '../pages/library-search';
/*
  Generated class for the LibraryHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-library-home',
  templateUrl: 'library-home.html'
})

export class LibraryHome {

    private student : any;
    public keyword : any;
    public library : any;

  
  constructor(public navCtrl: NavController,
    private userservice: UserService,
    public libraryService: LibraryService) {

    }

  ionViewDidLoad() {
    console.log('Hello LibraryHome Page');

    this.userservice.getUser().then(s => {
      if(s != null){
        this.student = s;
        console.log('This is the class', JSON.stringify(this.student));

        this.libraryService.getIssuedBookDetails(this.student.enrollment_no)
        .subscribe(
          data => {
            this.library = data;
            console.log("Library Book_Detail Object: ",JSON.stringify(this.library));
          }
        );

        this.libraryService.getFine(this.student.enrollment_no)
        .subscribe(
          data => {
            this.library = data;
            console.log("Library Fine_object: ",JSON.stringify(this.library));
          }
        );

      }
      else{
        this.navCtrl.setRoot(Login);
      }

    },
      error => console.log('Error reading data'));
  }
  searchBook(event: any){
    
    let keyword = event.target.value;
    this.navCtrl.push(LibrarySearch, {
      keyword : this.keyword
    });
  }

}
