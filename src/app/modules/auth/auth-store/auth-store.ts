import {Subject} from 'rxjs';

interface InitialState {
  status: string;
  message?: string;
}

interface Event {
  name: string;
  payload?: InitialState;
}

let state: InitialState = {
  status: null,
  message: null
};

export enum ActionTypes {
  AUTH_PENDING = '[AUTH] Pending ',
  AUTH_FINISHED = '[AUTH] Finished',
}

export const authStore = new Subject<InitialState>();
export const eventDispatcher = new Subject<Event>();

eventDispatcher.subscribe((data: Event) => {
  switch (data.name) {
    case ActionTypes.AUTH_PENDING:
      state = {
        status: 'pending'
      };
      authStore.next(state);
      break;
    case ActionTypes.AUTH_FINISHED:
      state = {
        status: data.payload.status,
        message: data.payload.message
      };
      authStore.next(state);
      break;
    default: break;
  }
});
