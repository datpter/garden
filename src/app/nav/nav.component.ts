import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {AuthService} from "../auth.service";
import {UserStoreService} from "../user-store.service";
import {UiStateService} from "../ui-state.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  toggleHeader() {
    this.uiStateService.toggleHeaderVisibility();

  }//âne

  title = 'garen102';
  isSearchBarVisible: boolean = false;
  toggleSearchBar() {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }
  preventClose(event: Event) {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
  }
  public users:any = [];
  public role!:string;

  public fullName : string = "";
  constructor(private api : ApiService, private auth: AuthService, private userStore: UserStoreService,private uiStateService: UiStateService) {


  }

  ngOnInit() {
    this.api.getUsers()
      .subscribe(res=>{
          this.users = res;
        }
      );

    this.uiStateService.headerVisible$.subscribe((visible) => {//ẩn
      //  this.headerVisible = visible;
    });











    this.userStore.getFullNameFromStore()
      .subscribe(val=>{
        const fullNameFromToken = this.auth.getfullNameFromToken();
        this.fullName = val || fullNameFromToken
      });

    this.userStore.getRoleFromStore()
      .subscribe(val=>{
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      })

  }

  logout(){
    this.auth.signOut();
    alert("LogOut Success")
    window.location.reload();
  }
  account(){
    this.auth.account();
    window.location.reload();

  }
  isLoggedIn: boolean = false;






}
