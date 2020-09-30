import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.setItem('user', null);
      this.router.navigate(['/auth'], { relativeTo: this.route.parent });
    });
  }


}
