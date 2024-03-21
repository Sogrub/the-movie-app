import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MovieService } from './shared/services/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { MySweetPopupService } from './shared/services/my-sweet-popup/my-sweet-popup.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HttpClientModule],
  providers: [MovieService, MySweetPopupService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'the-movie-frontend';
}
