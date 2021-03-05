import { Action } from '@ngrx/store';

export const TASK_ADDED = '[Todo] Task Added';
export const TASK_REMOVED = '[Todo] Task Removed';
export const TASK_UPDATED = '[Todo] Task Updated';

export class TaskAdded implements Action {
   public readonly type = TASK_ADDED;
   constructor(public payload: {
      id: number,
      name: string;
      description: string;
      labels: string[];
      date: string;
      notes: string;
   }) { }
}

export class TaskUpdated implements Action {
   public readonly type = TASK_UPDATED;
   constructor(public payload: {
      id: number
   }) { }
}

export class TaskRemoved implements Action {
   public readonly type = TASK_REMOVED;
   constructor(public payload: {
      id: number
   }) { }
}

export type TaskActions = TaskAdded | TaskRemoved | TaskUpdated;