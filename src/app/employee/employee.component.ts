import { group } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  new_candidate: any;

  opt = 0;

  searchName = '';
  removeDepartment = '';
  candidate_data = [
    {
      id: 11,
      name: 'Ash',
      department: 'Finance',
      joining_date: '8/10/2016',
    },
    { id: 12, name: 'John', department: 'HR', joining_date: '18/1/2011' },
    {
      id: 13,
      name: 'Zuri',
      department: 'Operations',
      joining_date: '28/11/2019',
    },
    {
      id: 14,
      name: 'Vish',
      department: 'Development',
      joining_date: '7/7/2017',
    },
    {
      id: 15,
      name: 'Barry',
      department: 'Operations',
      joining_date: '19/8/2014',
    },
    { id: 16, name: 'Ady', department: 'Finance', joining_date: '5/10/2014' },
    {
      id: 17,
      name: 'Gare',
      department: 'Development',
      joining_date: '6/4/2014',
    },
    {
      id: 18,
      name: 'Hola',
      department: 'Development',
      joining_date: '8/12/2010',
    },
    { id: 19, name: 'Ola', department: 'HR', joining_date: '7/5/2011' },
    {
      id: 20,
      name: 'Kim',
      department: 'Finance',
      joining_date: '20/10/2010',
    },
  ];

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.new_candidate = this.candidate_data;
    this.sortbyNameAndJoiningDateFunc();
  }

  removeDeptFunc() {
    this.opt = 4;

    console.log(this.new_candidate);
    this.new_candidate = this.candidate_data.filter(
      (value) => value.department !== this.removeDepartment
    );
  }
  distictDeptAndCountFunc() {
    this.opt = 3;
    this.new_candidate = [];

    let data = this.candidate_data.reduce(function (obj, v) {
      obj[v.department] = (obj[v.department] || 0) + 1;
      return obj;
    }, {});

    for (let key in data) {
      let payload = {
        department: key,
        count: data[key],
      };
      this.new_candidate.push(payload);
    }
  }
  searchByNameFunc() {
    this.opt = 1;
    this.new_candidate = this.candidate_data.filter(
      (value) =>
        value.name.toLowerCase().trim() === this.searchName.toLowerCase()
    );

    return;
  }

  sortbyNameAndJoiningDateFunc() {
    this.opt = 0;
    this.new_candidate = this.candidate_data.sort((a, b) => {
      return (
        a.name.localeCompare(b.name) ||
        a.joining_date.localeCompare(b.joining_date)
      );
    });
  }

  expMoreThan2YrFunc() {
    this.opt = 2;

    this.new_candidate = this.candidate_data.filter(
      (value) =>
        Math.abs(
          new Date(
            this.datePipe.transform(new Date(), 'yyyy-MM;dd')
          ).getFullYear() -
            new Date(
              this.datePipe.transform(
                new Date(value.joining_date),
                'yyyy-MM;dd'
              )
            ).getFullYear()
        ) > 2
    );
  }
}
