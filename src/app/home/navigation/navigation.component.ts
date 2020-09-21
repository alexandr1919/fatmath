import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  logout() {
    localStorage.setItem('user', null);
    this.router.navigate(['/auth'], { relativeTo: this.route.parent });
  }


}
