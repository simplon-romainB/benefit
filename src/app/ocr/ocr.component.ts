import { Component, OnInit } from '@angular/core';
import { createWorker } from 'tesseract.js';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.sass']
})
export class OCRComponent implements OnInit {

  constructor() { 
    this.read()
  }

  ngOnInit(): void {
  }
  async read() {
    const worker = createWorker({
      logger: m => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage('fra');
    await worker.initialize('fra');
    const { data: { text } } = await worker.recognize('/assets/img/facturette.jpg');
    console.log(text);
    await worker.terminate();
  }
}
