import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private routeActive:ActivatedRoute) { }

  ngOnInit(): void {
    this.routeActive.params.subscribe((param) => {
      console.log(param);
    })
  }

}
