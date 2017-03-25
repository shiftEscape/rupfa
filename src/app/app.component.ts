import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DataService } from './data.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

declare var window;

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
  totalGoals = 0
  remainingAmount = 0
  netAmount = 0
  costEssentials = [
    { title: 'Rent', value: 0 },
    { title: 'Utilities', value: 0 },
    { title: 'Food', value: 0 },
    { title: 'Transportation', value: 0 }
  ]
  goals = []
  title = 'RUPFA.io'
  year: number = 0
  value: number = 0
  computedValue: number = 0
  btnState: 'disabled'
  showProceed: boolean = false
  essentialsOk = false
  variablesOk = false
  savingsOk = false
  buyForecast:any = 0
  updateWithGoal = false

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

  compute = (title: string, value: number) => {
    this.totalCostEssentials = this.costEssentials.map(x => x.value).reduce((a, c) => Number(a) + Number(c))
    this.remainingAmount = this.netAmount - this.totalCostEssentials - this.totalGoals
    
    let twentyPercent = ((this.netAmount/10)* 2)
    let fiftyPercent = (this.netAmount/2)
    let thirtyPercent = ((this.netAmount/10) * 3)
    console.log(fiftyPercent, ' ', thirtyPercent,' ',twentyPercent)
    if (this.totalCostEssentials <= fiftyPercent){
      this.essentialsOk = true
    }else{
      this.essentialsOk = false
    }

    if ((this.remainingAmount - twentyPercent) >= thirtyPercent){
      this.variablesOk = true
    }else{
      this.variablesOk = false
    }

    if ((this.remainingAmount - thirtyPercent) < twentyPercent){
      this.savingsOk = false
    }else{
      this.savingsOk = true 
    }

    this.showProceed = true
  }

  updateGoals = data => {
    this.totalGoals = data
  }

  updateAllocate = data => {
    this.buyForecast = this.totalGoals / data;
    this.buyForecast = (this.buyForecast).toString().substr(0,2)
    this.updateWithGoal = true
  }

  refresh = () => {
    window.reload()
  }

  ngOnInit() {
    this.data.getModels().subscribe(items => this.models = items)
  }

}
