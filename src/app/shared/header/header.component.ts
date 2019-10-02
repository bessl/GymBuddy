import {Component, Input, OnInit} from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() backLink: string;
  environment = environment;

  constructor() { }

  ngOnInit() {}

}
