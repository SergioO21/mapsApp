import {
	AfterViewInit,
	Component,
	ElementRef,
	Input,
	ViewChild,
} from "@angular/core";
import { Map, Marker } from "mapbox-gl";

@Component({
	selector: "app-mini-map",
	templateUrl: "./mini-map.component.html",
	styleUrl: "./mini-map.component.css",
})
export class MiniMapComponent implements AfterViewInit {
	@Input() lngLat?: [number, number];
	@ViewChild("map") divMap?: ElementRef;

	map?: Map;

	ngAfterViewInit(): void {
		if (!this.divMap) throw "HTML document not found";
		if (!this.lngLat) throw "LngLat is required";

		this.map = new Map({
			container: this.divMap.nativeElement,
			style: "mapbox://styles/mapbox/streets-v12",
			center: this.lngLat,
			zoom: 15,
			interactive: false,
		});

		const color = "#xxxxxx".replace(/x/g, () =>
			((Math.random() * 16) | 0).toString(16)
		);

		new Marker({ color }).setLngLat(this.lngLat).addTo(this.map);
	}
}
