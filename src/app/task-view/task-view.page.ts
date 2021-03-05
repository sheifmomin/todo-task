import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/app.state';
import * as TaskState from '../../_store/actions/auth.actions';
import { ActivatedRoute } from '@angular/router';
import * as taskReducer from '../../_store/reducers/auth.reducer';
import { filter } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.page.html',
  styleUrls: ['./task-view.page.scss'],
})
export class TaskViewPage implements OnInit {

  private currentId: number;
  currentTask: any;
  public color = [ 'success', 'warning', 'primary', 'secondary', 'tertiary',  'danger'];

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentId = parseInt(params['id']);
      this.store.select(taskReducer.selectAuthToken).pipe(filter(tasks => tasks.id !== this.currentId)).subscribe(tasks => {
        var x = JSON.parse(JSON.stringify(tasks));
        for (let j=0; j < x.tasks.length; j++) {
          if (x.tasks[j].id === this.currentId) {
            this.currentTask = x.tasks[j];
            break;
          }
        }
        console.log(this.currentTask);
      });
    });
  }

  public getDateFormatted(date: Date) {
    return moment(date).subtract(10, 'days').calendar();
  }
}
