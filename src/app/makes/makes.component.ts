import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service'
@Component({
  selector: 'app-makes',
  templateUrl: './makes.component.html',
  styleUrls: ['./makes.component.css'],
  providers:[DataService]
})
export class MakesComponent implements OnInit {
  @Input('makesData') makes;
  @Input('handleChange') private handleChange;
  constructor() { }

  ngOnInit() {
    
  }
  
}
