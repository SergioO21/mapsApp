import {
	AfterViewInit,
	Component,
	ElementRef,
	OnDestroy,
	ViewChild,
} from "@angular/core";
import { LngLat, Map, Marker } from "mapbox-gl";
import { MarkerData, PlainMarker } from "./interfaces";

@Component({
	templateUrl: "./markers-page.component.html",
	styleUrl: "./markers-page.component.css",
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {
	@ViewChild("map") divMap?: ElementRef;

	minZoom: number = 1;
	maxZoom: number = 18;
	currentZoom: number = 5.25;
	map?: Map;
	currentLocation: LngLat = new LngLat(-73, 4);
	markers: MarkerData[] = [];

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

		this.readFromLocalStorage();
	}

	ngOnDestroy(): void {
		this.map?.remove();
	}

	createMarker(): void {
		const color = "#xxxxxx".replace(/x/g, () =>
			((Math.random() * 16) | 0).toString(16)
		);
		const lngLat = this.map?.getCenter();
		if (!lngLat) return;

		this.addMarker(lngLat, color);
		this.saveToLocalStorage();
	}

	addMarker(lngLat: LngLat, color: string): void {
		if (!this.map) return;

		const marker = new Marker({
			color: color,
			draggable: true,
		})
			.setLngLat(lngLat)
			.addTo(this.map);

		this.markers.push({ color, marker });
	}

	deleteMarker(index: number): void {
		this.markers[index].marker.remove();
		this.markers.splice(index, 1);
		console.log(this.markers);
	}

	flyToMarker(marker: Marker): void {
		this.map?.flyTo({
			zoom: 15,
			center: marker.getLngLat(),
		});
	}

	saveToLocalStorage(): void {
		const plainMarkers: PlainMarker[] = this.markers.map(
			({ color, marker }) => {
				return {
					color: color,
					lngLat: marker.getLngLat().toArray(),
				};
			}
		);

		localStorage.setItem("plainMarkers", JSON.stringify(plainMarkers));
	}

	readFromLocalStorage(): void {
		const plainMarkersString = localStorage.getItem("plainMarkers") ?? "[]";
		const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

		plainMarkers.forEach(({ color, lngLat }) => {
			const [lng, lat] = lngLat;
			const coords = new LngLat(lng, lat);
			this.addMarker(coords, color);
		});
	}
}
