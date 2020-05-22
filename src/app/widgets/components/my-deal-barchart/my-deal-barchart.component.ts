import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {forEach} from '@angular-devkit/schematics';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-my-deal-barchart',
  templateUrl: './my-deal-barchart.component.html',
  styleUrls: ['./my-deal-barchart.component.scss'],
})
export class MyDealBarchartComponent implements OnInit, OnChanges {

  @Input() filterdDealsByYear: any;
  @Input() currentYear: any;

  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 15,
        fontFamily: 'Poppins',
      }
    },
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          callback: (label, index, labels) => {
            return `£${this.numberWithCommas(label)}`;
          }
        },
        gridLines: {
          display: false
        }
      }]
    }
  };
  public barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public roiData = [];
  public capitalData = [];

  public barChartData: ChartDataSets[] = [
    {
      data: this.capitalData,
      label: 'Capital',
      stack: 'a',
      backgroundColor: '#3a8093',
      hoverBackgroundColor: '#2c6372',
      borderColor: '#2c6372',
    },
    {
      data: this.roiData,
      label: 'ROI',
      stack: 'a',
      backgroundColor: '#38d0d2',
      hoverBackgroundColor: '#34c0c2',
      borderColor: '#34c0c2',
    }
  ];

  ngOnChanges(changes: SimpleChanges) {
    this.setBarChart();
  }

  constructor() {
  }

  ngOnInit() {
  }

  setBarChart() {
    let tempCapitalData = [] as any;
    this.roiData = [];
    this.capitalData = [];
    const groupByDate = this.filterdDealsByYear.reverse().reduce((results, item) => {
      const current = results.find(i => this.getRealMonth(i.id) === this.getRealMonth(item.id));
      if (current) {
        // tslint:disable-next-line:forin
        const tempArray = [] as any;
        // tslint:disable-next-line:forin
        for (const property in item) {
          if (property === 'id' || property === 'realData' || property === 'capital_amount') {
            current[property] = item[property];
          }
          if (property === 'sum_amount' || property === 'roi_amount') {
            current[property] += parseFloat(item[property]);
          }
        }
      } else {
        results.push({...item});
      }
      return results;
    }, []);
    this.getRealSumAmount(groupByDate).then(res => {
      tempCapitalData = res;
      groupByDate.map((currentValue, index, array) => {
        const paramDate = new Date(currentValue.id.replace(/-/g, '/'));
        let orderIndex: number;
        switch (12 - (paramDate.getMonth() + 1)) {
          case 0: orderIndex = 11; break;
          case 1: orderIndex = 10; break;
          case 2: orderIndex = 9; break;
          case 3: orderIndex = 8; break;
          case 4: orderIndex = 7; break;
          case 5: orderIndex = 6; break;
          case 6: orderIndex = 5; break;
          case 7: orderIndex = 4; break;
          case 8: orderIndex = 3; break;
          case 9: orderIndex = 2; break;
          case 10: orderIndex = 1; break;
          case 11: orderIndex = 0; break;
          default: break;
        }
        this.capitalData[orderIndex] = (currentValue.capital_amount - currentValue.roi_amount).toFixed(2);
        this.roiData[orderIndex] = currentValue.roi_amount.toFixed(2);
      });
      this.barChartData = [
        {
          data: this.capitalData,
          label: 'Capital',
          stack: 'a',
          backgroundColor: '#3a8093',
          hoverBackgroundColor: '#2c6372',
          borderColor: '#2c6372',
        },
        {
          data: this.roiData,
          label: 'ROI',
          stack: 'a',
          backgroundColor: '#38d0d2',
          hoverBackgroundColor: '#34c0c2',
          borderColor: '#34c0c2',
        }
      ];
    });
  }

  getRealSumAmount(deals): any {
    return new Promise((resolve) => {
      const temp = [];
      deals.map((currentValue, index, array) => {
        temp.push((this.sum(deals, deals.length) - this.sum(deals, index)));
      });
      resolve(temp);
    });
  }

  sum(deals, dataLength: any) {
    let temp = 0;
    if (dataLength === 0) {
      temp = 0;
    } else {
      for (let i = 0; i < dataLength; i++) {
        temp += deals[i].sum_amount;
      }
    }
    return temp;
  }

  getRealMonth(param: string) {
    const temp = new Date(param.replace(/-/g, '/'));
    return temp.getMonth();
  }

  numberWithCommas(x) {
    const parts = (Math.round(x * 100) / 100).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

}
