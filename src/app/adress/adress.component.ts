 /// <reference  types="@types/googlemaps"  />
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit} from '@angular/core';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css']
})
export class AdressComponent implements OnInit {
  @ViewChild('addresstext') addresstext:  ElementRef;
  @ViewChild('gmap') gmapElement:  any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit():  void {
		this.getPlaceAutocomplete();
	}
	getPlaceAutocomplete() {
		const  autocomplete  =  new  google.maps.places.Autocomplete(this.addresstext.nativeElement,
		{
			componentRestrictions: { country:  'FR' }
		});

		google.maps.event.addListener(autocomplete, 'place_changed', () => {
			const  place  =  autocomplete.getPlace();
			const  myLatlng  =  place.geometry.location;
			const  mapOptions  = {
				zoom:  15,
				center:  myLatlng
			};
			const  map  =  new  google.maps.Map(this.gmapElement.nativeElement, mapOptions);
			const  marker  =  new  google.maps.Marker({
				position:  myLatlng,
				title:  place.name
			});
		});
	}

//  initMap(): void {
//     const map = new google.maps.Map(
//       document.getElementById("map") as HTMLElement,
//       {
//         center: { lat: 40.749933, lng: -73.98633 },
//         zoom: 13,
//       }
//     );
//     const card = document.getElementById("pac-card") as HTMLElement;
//     const input = document.getElementById("pac-input") as HTMLInputElement;
//     const biasInputElement = document.getElementById(
//       "use-location-bias"
//     ) as HTMLInputElement;
//     const strictBoundsInputElement = document.getElementById(
//       "use-strict-bounds"
//     ) as HTMLInputElement;
//     const options = {
//       componentRestrictions: { country: "fr" },
//       fields: ["formatted_address", "geometry", "name"],
//       origin: map.getCenter(),
//       strictBounds: false,
//       types: ["establishment"],
//     } as google.maps.places.AutocompleteOptions;

//     map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

//     const autocomplete = new google.maps.places.Autocomplete(input, options);

//     // Bind the map's bounds (viewport) property to the autocomplete object,
//     // so that the autocomplete requests use the current map bounds for the
//     // bounds option in the request.
//     autocomplete.bindTo("bounds", map);

//     const infowindow = new google.maps.InfoWindow();
//     const infowindowContent = document.getElementById(
//       "infowindow-content"
//     ) as HTMLElement;
//     infowindow.setContent(infowindowContent);
//     const marker = new google.maps.Marker({
//       map,
//       anchorPoint: new google.maps.Point(0, -29),
//     });

//     autocomplete.addListener("place_changed", () => {
//       infowindow.close();
//       marker.setVisible(false);
//       const place = autocomplete.getPlace();

//       if (!place.geometry || !place.geometry.location) {
//         // User entered the name of a Place that was not suggested and
//         // pressed the Enter key, or the Place Details request failed.
//         window.alert("No details available for input: '" + place.name + "'");
//         return;
//       }

//       // If the place has a geometry, then present it on a map.
//       if (place.geometry.viewport) {
//         map.fitBounds(place.geometry.viewport);
//       } else {
//         map.setCenter(place.geometry.location);
//         map.setZoom(17);
//       }
//       marker.setPosition(place.geometry.location);
//       marker.setVisible(true);

//       infowindowContent.children["place-name"].textContent = place.name;
//       infowindowContent.children["place-address"].textContent =
//         place.formatted_address;
//       infowindow.open(map, marker);
//     });

//     // Sets a listener on a radio button to change the filter type on Places
//     // Autocomplete.
//     function setupClickListener(id, types) {
//       const radioButton = document.getElementById(id) as HTMLInputElement;
//       radioButton.addEventListener("click", () => {
//         autocomplete.setTypes(types);
//         input.value = "";
//       });
//     }

//     setupClickListener("changetype-all", []);
//     setupClickListener("changetype-address", ["address"]);
//     setupClickListener("changetype-establishment", ["establishment"]);
//     setupClickListener("changetype-geocode", ["geocode"]);

//     biasInputElement.addEventListener("change", () => {
//       if (biasInputElement.checked) {
//         autocomplete.bindTo("bounds", map);
//       } else {
//         // User wants to turn off location bias, so three things need to happen:
//         // 1. Unbind from map
//         // 2. Reset the bounds to whole world
//         // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
//         autocomplete.unbind("bounds");
//         autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
//         strictBoundsInputElement.checked = biasInputElement.checked;
//       }
//       input.value = "";
//     });

//     strictBoundsInputElement.addEventListener("change", () => {
//       autocomplete.setOptions({
//         strictBounds: strictBoundsInputElement.checked,
//       });

//       if (strictBoundsInputElement.checked) {
//         biasInputElement.checked = strictBoundsInputElement.checked;
//         autocomplete.bindTo("bounds", map);
//       }
//       input.value = "";
//     });
//   }
}


