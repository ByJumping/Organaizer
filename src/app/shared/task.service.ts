import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import * as moment from "moment";

interface Taskk {
  id?: string
  title: string
  date?: string
}

interface CreateResponse {
  name: string
}

@Injectable({providedIn: 'root'})

export class TaskService {
  static url = 'https://organaizer-fc293-default-rtdb.europe-west1.firebasedatabase.app/tasks'

  constructor(public http: HttpClient) {
  }

  load(date: moment.Moment):Observable<Taskk[]> {
    return this.http
      .get<Taskk[]>(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => {
        if(!tasks) {
          return []
        }
        // @ts-ignore
        return Object.keys(tasks).map(key => ({...tasks[key], id: key}))
      }))
  }

  create(task: Taskk): Observable<Taskk> {
    return this.http
      .post<any>(`${TaskService.url}/${task.date}.json`, task)
      .pipe(map(res => {
        return {...task, id: res.name}
      }))
  }

  remove(task: Taskk): Observable<void> {
    return this.http
      .delete<void>(`${TaskService.url}/${task.date}/${task.id}.json`)
  }
}
