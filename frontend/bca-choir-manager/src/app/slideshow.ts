import { CommonModule } from "@angular/common";
import {NgModule} from "@angular/core";
import { PhotoSlideshowComponent } from "./components/photo-slideshow/photo-slideshow.component";

@NgModule({
    imports: [CommonModule],
    declarations: [PhotoSlideshowComponent],
    exports: [PhotoSlideshowComponent],
})
export class SlideshowModule{}