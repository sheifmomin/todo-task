import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/app.state';
import * as TaskState from '../../_store/actions/auth.actions';
import * as taskReducer from '../../_store/reducers/auth.reducer';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-write-task',
  templateUrl: './write-task.page.html',
  styleUrls: ['./write-task.page.scss'],
})

export class WriteTaskPage implements OnInit {

  private currentId: number;
  public labelsList: string[] = [];
  public submitted = false;
  public newTask = true;
  public color = [ 'success', 'warning', 'primary', 'secondary', 'tertiary',  'danger'];
  
  addTaskForm = new FormGroup({
    name: new FormControl('', [ Validators.required ]),
    description: new FormControl('', [ Validators.required ]),
    labels: new FormControl(''),
    date: new FormControl(''),
    notes: new FormControl('')
  });

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => { 
      this.currentId = parseInt(params['id']);
    });
  }

  ngOnInit() {
    if (this.currentId) {
      this.newTask = false;
      this.store.select(taskReducer.selectAuthToken).pipe(filter(tasks => tasks.id !== this.currentId)).subscribe(tasks => {
        var x = JSON.parse(JSON.stringify(tasks));
        for (let j=0; j < x.tasks.length; j++) {
          if (x.tasks[j].id === this.currentId) {
            this.populateValues(x.tasks[j]);
            break;
          }
        }
      });
    } else {
      this.newTask = true;
      this.addTaskForm.reset();
    }
  }

  /** On space or tab press on home page options */
  public emitKeyEvent(event, index) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      this.createLabelTag();
    }
    if(event.keyCode === 8) {
      this.labelsList.pop();
    }
  }

  public createLabelTag() {
    const labelsField = this.addTaskForm.controls.labels;
    if (labelsField.value) {
      this.labelsList.push(labelsField.value);
      labelsField.setValue('');
    }
  }

  public removeLabelTag(index: number) {
    if (index > -1) {
      this.labelsList.splice(index, 1);
    }
  }
  
  public populateValues(res) {
    this.labelsList = res.labels;
    const formPath = this.addTaskForm.controls;
    formPath.name.setValue(res.name);
    formPath.description.setValue(res.description);
    formPath.date.setValue(res.date);
    formPath.notes.setValue(res.notes);
  }

  public addTask() {
    this.submitted = true;
    if (this.addTaskForm.invalid) {
      return;
    }
    if (!this.newTask) {
      this.deleteTask();
    }
    const formControl = this.addTaskForm.controls;
    this.store.dispatch(new TaskState.TaskAdded({
      id: Math.floor(1000 + Math.random() * 9000),
      name: formControl.name.value,
      description: formControl.description.value,
      labels: this.labelsList,
      date: formControl.date.value,
      notes: formControl.notes.value
    }));
    this.router.navigate(['/list']);
  }

  public deleteTask() {
    this.store.dispatch(new TaskState.TaskRemoved({
      id: this.currentId
    }));
  }

  get f() {
    return this.addTaskForm.controls;
  }
}


