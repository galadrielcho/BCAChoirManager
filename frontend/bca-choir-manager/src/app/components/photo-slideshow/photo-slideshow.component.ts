import { Component, Input } from '@angular/core';
import { SlideInterface } from './types/slides.interface';
@Component({
  selector: 'app-photo-slideshow',
  templateUrl: './photo-slideshow.component.html',
  styleUrls: ['./photo-slideshow.component.css']
})
export class PhotoSlideshowComponent {
  @Input() slides: SlideInterface[] = [];

  currentIndex: number = 0;
  imageObjects: HTMLImageElement[] = [];

  ngOnInit() {
    // preload images in the background
    this.slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.url;
      this.imageObjects.push(img);
    });
  }

  goToNext(): void {
    const isLastSlide =  this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.currentIndex = newIndex;
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide ? (this.slides.length - 1) : this.currentIndex - 1;
    this.currentIndex = newIndex;
  }

  getCurrentSlideUrl(): string {
    return `url('${this.slides[this.currentIndex].url}')`;
  }
}
