import {Component, Input} from '@angular/core';
import {Movie} from "../../models/movie";

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent
{
  @Input({required: true}) movie!: Movie;
  hostname: string = "localhost";
}
