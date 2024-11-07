import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { Map } from "mapbox-gl";

@Component({
	templateUrl: "./zoom-range-page.component.html",
	styleUrl: "./zoom-range-page.component.css",
})
export class ZoomRangePageComponent implements AfterViewInit {
	@ViewChild("map") divMap?: ElementRef;

	minZoom: number = 1;
	maxZoom: number = 18;
	currentZoom: number = 9.5;
	map?: Map;

	ngAfterViewInit(): void {
		if (!this.divMap) throw "HTML document not found";

		this.map = new Map({
			container: this.divMap.nativeElement,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [-74.5, 40],
			zoom: this.currentZoom,
			minZoom: this.minZoom,
			maxZoom: this.maxZoom,
		});

		this.mapListeners();
	}

	get zoomRange(): number {
		const { minZoom, maxZoom, currentZoom } = this;
		return ((currentZoom - minZoom) / (maxZoom - minZoom)) * 100;
	}

	mapListeners(): void {
		if (!this.map) throw "Map not found";

		this.map.on("zoom", () => {
			this.currentZoom = this.map!.getZoom();
		});
	}

	zoomIn(): void {
		if (this.currentZoom >= this.maxZoom) return;
		this.map?.zoomIn();
	}

	zoomOut(): void {
		if (this.currentZoom <= this.minZoom) return;
		this.map?.zoomOut();
	}

	zoomChanged(value: string) {
		this.currentZoom = Number(value);
		this.map?.zoomTo(this.currentZoom);
	}
}
