import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  @Input('modelsData') models;
  @Input('selectModel') selectModel;
  constructor() { }

  ngOnInit() {
  }

}
