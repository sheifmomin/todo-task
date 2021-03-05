import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/app.state';
import * as taskReducer from '../../_store/reducers/auth.reducer';
import * as moment from 'moment';

export interface Tasks {
  id: number
  name: string;
  description: string;
  labels: string[];
  date: string;
  notes: string;
}

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.page.html',
  styleUrls: ['./list-view.page.scss'],
})
export class ListViewPage implements OnInit {
  public tasks: any = [];
  public color = [ 'success', 'warning', 'primary', 'secondary', 'tertiary',  'danger'];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(taskReducer.selectAuthToken).pipe().subscribe(tasks => {
      var x = JSON.parse(JSON.stringify(tasks));
      this.tasks = x.tasks;
    });
  }

  public getDateFormatted(date: Date) {
    return moment(date).subtract(10, 'days').calendar();
  }
}
