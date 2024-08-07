import { Component, HostListener, Input, OnInit } from '@angular/core';
import { style } from '@angular/animations';
import { languages, notifications, userItems } from './header-dummy-data';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../../../../profile/profile.component';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  canShowSearchAsOverlay = false;
  selectedLanguage: any;

  languages = languages;
  notifications: any;
  userItems = userItems;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private service: EmployeeService
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(ProfileComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  setlang(lang: any) {
    window.localStorage.setItem('LANG', JSON.stringify(lang));
    this.selectedLanguage = lang;
  }

  getUser() {
    this.service
      .getnotificationByUserId(
        StorageService.getUser()?.id ? Number(StorageService.getUser()?.id) : 0
      )
      .subscribe((res) => {
        this.notifications = res.map((el: any) => ({
          icon: 'far fa-file',
          Subject: 'New Project',
          description: el.description,
          dueDate: el.dueDate,
        }));
      });
  }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.selectedLanguage = StorageService.getlang();
    this.getUser();
  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl('/login');
  }

  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }

  checkCanShowSearchAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }
}
