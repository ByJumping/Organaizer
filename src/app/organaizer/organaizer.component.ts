import { Component, OnInit } from '@angular/core';
import {DateService} from "../shared/date.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../shared/task.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-organaizer',
  templateUrl: './organaizer.component.html',
  styleUrls: ['./organaizer.component.scss']
})
export class OrganaizerComponent implements OnInit {

  form!: FormGroup;
  // @ts-ignore
  tasks: Taskk[] = []

  constructor(public dateService: DateService,
              public tasksService: TaskService
  ) {

  }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value
    // @ts-ignore
    const task: Taskk = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.tasksService.create(task).subscribe(task=> {
      this.tasks.push(task)
      this.form.reset()

    }, err => console.error(err))

  }

  // @ts-ignore
  remove(task: Taskk) {
      this.tasksService.remove(task).subscribe(()=> {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
      }, err => console.error(err))
  }

}
