import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as actions from '../actions/auth.actions';
export type TaskStateActions = actions.TaskActions;
import { AppState } from '../app.state';

export interface TaskState {
    id: number
    name: string;
    description: string;
    labels: string[];
    date: string;
    notes: string;
}

export interface TaskStateArray {
    tasks: TaskState[]
}

export const initialState: TaskStateArray = {
    tasks: []
};

export const selectAuthFeature = createFeatureSelector<TaskState>('tasks');
export const selectAuthToken = createSelector(selectAuthFeature, (state: TaskState) => state);

export function AuthStateReducer(state: TaskStateArray = initialState, action: TaskStateActions) {
    switch (action.type) {
        case actions.TASK_ADDED:
            return {...state, 
                    tasks: [...((new Set(state.tasks).add(action.payload)))]};
        case actions.TASK_REMOVED:
            return {
                ...state,
                tasks: [...state.tasks.filter(element => element.id !== action.payload.id)]
            };
        default:
            return state;
    }
}
