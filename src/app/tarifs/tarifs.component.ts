import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarifs',
  templateUrl: './tarifs.component.html',
  styleUrls: ['./tarifs.component.sass']
})
export class TarifsComponent implements OnInit {
  carouselItems = [
    'https://source.unsplash.com/7BLRSG-AkJs',
    'https://source.unsplash.com/rcJbbK5_iIA',
    'https://source.unsplash.com/yQUwIlUeU4o',
    'https://source.unsplash.com/MlaQmWvzRTw',
    'https://source.unsplash.com/6dTpYUcr1yg',
  ];

  constructor() { }

  ngOnInit(): void {
  }


}
