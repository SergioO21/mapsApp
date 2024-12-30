import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
	"pk.eyJ1Ijoic2VyZ2lvbzIxIiwiYSI6ImNtNWFibW5nZjNqdjgyc3EyODIyY3Bpa2EifQ.3NfQCxiocpHDLwfsVZOdcQ";

import { MapsRoutingModule } from "./maps-routing.module";
import { MiniMapComponent, SideMenuComponent } from "./components";
import { MapsLayoutComponent } from "./layout";
import {
	FullScreenPageComponent,
	MarkersPageComponent,
	PropertiesPageComponent,
	ZoomRangePageComponent,
} from "./pages";

@NgModule({
	declarations: [
		FullScreenPageComponent,
		MapsLayoutComponent,
		MarkersPageComponent,
		MiniMapComponent,
		PropertiesPageComponent,
		SideMenuComponent,
		ZoomRangePageComponent,
	],
	imports: [CommonModule, MapsRoutingModule],
})
export class MapsModule {}
