import {
	AfterViewInit,
	Component,
	ElementRef,
	OnDestroy,
	ViewChild,
} from "@angular/core";
import { LngLat, Map } from "mapbox-gl";

@Component({
	templateUrl: "./zoom-range-page.component.html",
	styleUrl: "./zoom-range-page.component.css",
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
	@ViewChild("map") divMap?: ElementRef;

	minZoom: number = 1;
	maxZoom: number = 18;
	currentZoom: number = 5.25;
	map?: Map;
	currentLocation: LngLat = new LngLat(-73, 4);

	ngAfterViewInit(): void {
		if (!this.divMap) throw "HTML document not found";

		this.map = new Map({
			container: this.divMap.nativeElement,
			style: "mapbox://styles/mapbox/streets-v12",
			center: this.currentLocation,
			zoom: this.currentZoom,
			minZoom: this.minZoom,
			maxZoom: this.maxZoom,
		});

		this.mapListeners();
	}

	ngOnDestroy(): void {
		this.map?.remove();
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

		this.map.on("move", () => {
			this.currentLocation = this.map!.getCenter();
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
