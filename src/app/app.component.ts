import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-shopping';
  showHeader = true;

  constructor(
      private router: Router
  ) {
    this.router.events.subscribe(value => {
      this.modifyHeader(this.router.url.toString());
  });
  }

  ngOnInit() {
  }

  modifyHeader(url: any) { // This method is called many times
      if (url === '/login') {
          this.showHeader = false;
      } else {
          this.showHeader = true;
      }
  }
}
