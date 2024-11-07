import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { Map } from "mapbox-gl";

@Component({
	templateUrl: "./full-screen-page.component.html",
	styleUrl: "./full-screen-page.component.css",
})
export class FullScreenPageComponent implements AfterViewInit {
	@ViewChild("map") divMap?: ElementRef;

	map?: Map;

	ngAfterViewInit(): void {
		if (!this.divMap) throw "HTML document not found";

		this.map = new Map({
			container: this.divMap.nativeElement,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [-74.5, 40],
			zoom: 9,
		});
	}
}
