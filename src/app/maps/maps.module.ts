import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

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
