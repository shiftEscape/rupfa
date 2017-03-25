import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DataService } from './data.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  constructor(private data: DataService) { }

  models = []
  makes = []
  totalCostEssentials = 0
  remainingAmount = 0
  netAmount = 0
  costEssentials = [
    { title: 'rent', value: 0 },
    { title: 'utilities', value: 0 },
    { title: 'food', value: 0 },
    { title: 'transportation', value: 0 }
  ]
  title = 'RUPHA.io'
  year: number = 0
  value: number = 0
  computedValue: number = 0
  btnState: 'disabled'
  showProceed: boolean = false

  compute(...args) {
    this.data.getCompute(this.year, this.value).subscribe(
      items => this.computedValue = items
    )
  }

  selectMake = (...args) => {
    const [make] = args
    this.data.getModels(make).subscribe(
      items => {
        this.models = items
      }
    )
  }

  selectModel = (...args) => {
    const [value] = args
    this.data.getCompute(this.year, value).subscribe(
      items => {
        this.computedValue = items.value
      }
    )

  }

  setNetAmount = (value) => {
    this.netAmount = value
  }

  updateComputation = (title: string, value: number) => {
    this.costEssentials = this.costEssentials.map(x => {
      return (x.title === title) ? Object.assign({}, x, { value }) : x
    })
    console.log(this.costEssentials)
  }

  computeRemaining = (title: string, value: number) => {
    const totalCostEssentials = this.costEssentials.map(x => x.value).reduce((a, c) => Number(a) + Number(c))
    this.remainingAmount = this.netAmount - totalCostEssentials
    this.showProceed = true
  }

  proceed() {
    
  }

  selectYear(year) {
    this.year = year
    this.data.getMakes().subscribe(items => this.makes = items)
  }

  ngOnInit() {
    this.data.getModels().subscribe(items => this.models = items)
  }

}
