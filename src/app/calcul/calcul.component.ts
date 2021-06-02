import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapService } from '../services/map.service';
import {  } from 'rxjs/add/operator/toPromise';
import { Booking } from 'src/app/models/booking.model';

@Component({
  selector: 'app-calcul',
  templateUrl: './calcul.component.html',
  styleUrls: ['./calcul.component.css']
})
export class CalculComponent implements OnInit {

  bookings: any[];
  bookingForm: FormGroup;
  address: any;
  addressForth: any;
  addressBack: any;
  distance: number;
  distanceForth: number;
  distanceBack: number;
  durationForth: number;
  durationBack: number;
  tarif: any;
  testTarif: any;
  formulaBooking: any;
  DistanceBooking: any[];
  addressPartner= JSON.parse(localStorage.getItem('addressPartner'));;

  constructor(private ngZone: NgZone, private fb: FormBuilder, private mapService: MapService) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      addressForth: [''],
      addressBack: [''],
      address: [''],
      formulaBooking: [''],
      firstNameCustomer: [''],
      lastNameCustomer: [''],
      mailCustomer: [''],
      phoneCustomer: [''],
      dateOfBirthdayCustomer: [''],
      licensePlateCar: [''],
      modelCar: [''],
      brandCar: [''],
      motorizationCar: [''],
      dateOfCirculationCar: ['']
    });
    this.initAutocomplete();
    console.log('intialisation addressBack', JSON.parse(localStorage.getItem('addressBack')));
  }

  changeFormulaBooking(e) {
  }

  initAutocomplete() {
    let autocomplete = new google.maps.places.Autocomplete(document.getElementById('address') as HTMLInputElement);
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //retrouver les lieux
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        // console.log('place is ', place);
        // this.form.address1 = place.formatted_address;
        this.address = place.formatted_address
        //console.log('address 1 ', this.form.address1);
        console.log(this.bookingForm);
        this.bookingForm.patchValue({
          address : this.address
        });
        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
      });
    });
    let autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('addressForth1') as HTMLInputElement);
    autocomplete2.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //retrouver les lieux de l'address 2
        let place2: google.maps.places.PlaceResult = autocomplete2.getPlace();
        this.addressForth = place2.formatted_address
        // console.log('pickup ', this.form.pickupLocation);
        this.bookingForm.patchValue({
          addressForth : this.addressForth || "",
          addressBack: this.addressBack
        });
        //verify result
        if (place2.geometry === undefined || place2.geometry === null) {
          return;
        }
      });
    });
    let autocomplete3 = new google.maps.places.Autocomplete(document.getElementById('addressBack1') as HTMLInputElement);
    autocomplete3.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //retrouver les lieux de l'address 2
        let place3: google.maps.places.PlaceResult = autocomplete3.getPlace();
        this.addressBack = place3.formatted_address
        // console.log('pickup ', this.form.pickupLocation);
        this.bookingForm.patchValue({
          addressForth : this.addressForth || "",
          addressBack: this.addressBack
        });
        //verify result
        if (place3.geometry === undefined || place3.geometry === null) {
          return;
        }
      });
    });
  }

  getDist(): Promise<any>{
    this.formulaBooking = this.bookingForm.value.formulaBooking;
    console.log(this.bookingForm.value.address);
    console.log(this.bookingForm.value.addressForth);
    console.log(this.bookingForm.value.addressBack);
    if (this.bookingForm.value.address !== '') {
      return this.mapService.calculerDistance(this.address, this.addressPartner)
      .then((data) => {
        if (this.formulaBooking === 'forth') {
          this.distanceForth = data.distance;
          this.durationForth = data.duration;
          this.tarif = this.mapService.calculTarifTwoAddress(this.distanceForth, this.formulaBooking);
          localStorage.setItem('tarif', JSON.stringify(this.tarif));
          // console.log('compenent condition 1 service distance', JSON.parse(localStorage.getItem('distance')));
          // console.log('compenent condition 1 service duration', JSON.parse(localStorage.getItem('duration')));
          this.addressForth = this.bookingForm.value.address;
          localStorage.setItem('address', JSON.stringify(this.addressForth));
          // localStorage.setItem('addressBack', JSON.stringify(this.addressBack));
          // console.log('compenent condition 1 local addressForth', JSON.parse(localStorage.getItem('addressForth')));
          // console.log('compenent condition 1 local addressBack', JSON.parse(localStorage.getItem('addressBack')));
          this.addressForth = JSON.parse(localStorage.getItem('address'));
          // console.log('compenent condition 1 addressForth',this.addressForth);
          // console.log('compenent condition 1 addressBack',this.addressBack);
          // console.log('compenent condition 1 component distanceForth', this.distanceForth);
          // console.log('compenent condition 1 component  durationForth', this.durationForth);
          // console.log('compenent condition 1 component distanceBack', this.distanceBack);
          // console.log('compenent condition 1 component  durationBack', this.durationBack);
          // console.log('component constion 1 formula', this.formulaBooking);
          // console.log('component constion 1 tarif',this.tarif);
          // console.log('compenent condition 1 local distance', localStorage.removeItem('distance'));
          // console.log('compenent condition 1 local duration', localStorage.removeItem('duration'));
          // console.log('compenent condition 1 local address', localStorage.removeItem('address'));
          // this.addressForth = "";
          // this.distanceForth = 0;
          // this.durationForth = 0;
          this.rebuilderForm();
        }
        else if (this.formulaBooking === 'back') {
          console.log('2222');
          this.distanceBack = data.distance;
          this.durationBack = data.duration;
          this.tarif = this.mapService.calculTarifTwoAddress(this.distanceBack, this.formulaBooking);
          localStorage.setItem('tarif', JSON.stringify(this.tarif));
          // console.log('compenent condition 2 service distance', JSON.parse(localStorage.getItem('distance')));
          // console.log('compenent condition 2 service duration', JSON.parse(localStorage.getItem('duration')));
          this.addressBack = this.bookingForm.value.address;
          localStorage.setItem('address', JSON.stringify(this.addressBack));
          // console.log('compenent condition 2 local addressForth', JSON.parse(localStorage.getItem('addressForth')));
          // console.log('compenent condition 2 local addressBack', JSON.parse(localStorage.getItem('addressBack')));
          // console.log('compenent condition 2 addressForth',this.addressForth);
          // console.log('compenent condition 2 addressBack',this.addressBack);
          // console.log('compenent condition 2 component distanceForth', this.distanceForth);
          // console.log('compenent condition 2 component  durationForth', this.durationForth);
          // console.log('compenent condition 2 component distanceBack', this.distanceBack);
          // console.log('compenent condition 2 component  durationBack', this.durationBack);
          // console.log('component constion 2 formula', this.formulaBooking);
          // console.log('component constion 2 tarif',this.tarif);
          // console.log('compenent condition 2 local distance', localStorage.removeItem('distance'));
          // console.log('compenent condition 2 local duration', localStorage.removeItem('duration'));
          // console.log('compenent condition 2 local address', localStorage.removeItem('address'));
          // this.addressBack = "";
          // this.distanceBack = 0;
          // this.durationBack = 0;
          this.rebuilderForm();
        }
      });
    }
    else if (this.bookingForm.value.addressForth !== '' && this.bookingForm.value.addressBack !== '') {
      console.log(333);
      this.mapService.calculerDistance(this.addressForth, this.addressPartner)
      .then((data) => {
        if (this.formulaBooking === 'round') {
          this.distanceForth = data.distance;
          this.durationForth = data.duration;
          localStorage.setItem('tarif', JSON.stringify(this.tarif));
          // console.log('compenent condition 1 service distance', JSON.parse(localStorage.getItem('distance')));
          // console.log('compenent condition 1 service duration', JSON.parse(localStorage.getItem('duration')));
          this.addressForth = this.bookingForm.value.addressForth;
          localStorage.setItem('address', JSON.stringify(this.addressForth));
          // localStorage.setItem('addressBack', JSON.stringify(this.addressBack));
          // console.log('compenent condition 1 local addressForth', JSON.parse(localStorage.getItem('addressForth')));
          // console.log('compenent condition 1 local addressBack', JSON.parse(localStorage.getItem('addressBack')));
          this.addressForth = JSON.parse(localStorage.getItem('address'));
          // console.log('compenent condition 1 addressForth',this.addressForth);
          // console.log('compenent condition 1 addressBack',this.addressBack);
          // console.log('compenent condition 1 component distanceForth', this.distanceForth);
          // console.log('compenent condition 1 component  durationForth', this.durationForth);
          // console.log('compenent condition 1 component distanceBack', this.distanceBack);
          // console.log('compenent condition 1 component  durationBack', this.durationBack);
          // console.log('component constion 1 formula', this.formulaBooking);
          // console.log('component constion 1 tarif',this.tarif);
          // console.log('compenent condition 1 local distance', localStorage.removeItem('distance'));
          // console.log('compenent condition 1 local duration', localStorage.removeItem('duration'));
          // console.log('compenent condition 1 local address', localStorage.removeItem('address'));
        }
        else if (this.formulaBooking === 'technicalControl') {
          this.distanceForth = data.distance;
          this.durationForth = data.duration;
          this.tarif = this.mapService.calculTarifTwoAddress(this.distanceForth, this.formulaBooking);
          localStorage.setItem('tarif', JSON.stringify(this.tarif));
          // console.log('compenent condition 2 service distance', JSON.parse(localStorage.getItem('distance')));
          // console.log('compenent condition 2 service duration', JSON.parse(localStorage.getItem('duration')));
          this.addressBack = this.bookingForm.value.addressForth;
          localStorage.setItem('address', JSON.stringify(this.addressForth));
          // console.log('compenent condition 2 local addressForth', JSON.parse(localStorage.getItem('addressForth')));
          // console.log('compenent condition 2 local addressBack', JSON.parse(localStorage.getItem('addressForth')));
          // console.log('compenent condition 2 addressForth',this.addressForth);
          // console.log('compenent condition 2 addressBack',this.addressBack);
          // console.log('compenent condition 2 component distanceForth', this.distanceForth);
          // console.log('compenent condition 2 component  durationForth', this.durationForth);
          // console.log('compenent condition 2 component distanceBack', this.distanceForth);
          // console.log('compenent condition 2 component  durationBack', this.durationForth);
          // console.log('component constion 2 formula', this.formulaBooking);
          // console.log('component constion 2 tarif',this.tarif);
          // console.log('compenent condition 2 local distance', localStorage.removeItem('distance'));
          // console.log('compenent condition 2 local duration', localStorage.removeItem('duration'));
          // console.log('compenent condition 2 local address', localStorage.removeItem('address'));
        }
      });
      this.mapService.calculerDistance(this.addressBack, this.addressPartner)
      .then((data) => {
        if (this.formulaBooking === 'round') {
          this.distanceBack = data.distance;
          this.durationBack = data.duration;
          localStorage.setItem('tarif', JSON.stringify(this.tarif));
          // console.log('compenent condition 2 service distance', JSON.parse(localStorage.getItem('distance')));
          // console.log('compenent condition 2 service duration', JSON.parse(localStorage.getItem('duration')));
          this.addressBack = this.bookingForm.value.addressBack;
          this.tarif = this.mapService.calculTarifThreeAddress(this.distanceForth, this.distanceBack, this.formulaBooking);
          localStorage.setItem('address', JSON.stringify(this.addressBack));
          // localStorage.setItem('addressBack', JSON.stringify(this.addressBack));
          // console.log('compenent condition 2 local addressForth', JSON.parse(localStorage.getItem('addressForth')));
          // console.log('compenent condition 1 local addressBack', JSON.parse(localStorage.getItem('addressBack')));
          this.addressBack = JSON.parse(localStorage.getItem('address'));
          // console.log('compenent condition 2 addressForth',this.addressForth);
          // console.log('compenent condition 2 addressBack',this.addressBack);
          // console.log('compenent condition 2 component distanceForth', this.distanceForth);
          // console.log('compenent condition 2 component  durationForth', this.durationForth);
          // console.log('compenent condition 2 component distanceBack', this.distanceBack);
          // console.log('compenent condition 2 component  durationBack', this.durationBack);
          // console.log('component constion 2 formula', this.formulaBooking);
          // console.log('component constion 2 tarif',this.tarif);
          // console.log('compenent condition 2 local distance', localStorage.removeItem('distance'));
          // console.log('compenent condition 2 local duration', localStorage.removeItem('duration'));
          console.log('compenent condition 2 local address', localStorage.removeItem('address'));
          // this.addressForth = '';
          // this.addressBack = '';
          // this.distanceForth = 0;
          // this.durationForth = 0;
          // this.distanceBack = 0;
          // this.durationBack = 0;
          this.rebuilderForm();
        }
        else if (this.formulaBooking === 'technicalControl') {
          this.distanceBack = data.distance;
          this.durationBack = data.duration;
          this.tarif = this.mapService.calculTarifTwoAddress(this.distanceBack, this.formulaBooking);
          localStorage.setItem('tarif', JSON.stringify(this.tarif));
          // console.log('compenent condition 2 service distance', JSON.parse(localStorage.getItem('distance')));
          // console.log('compenent condition 2 service duration', JSON.parse(localStorage.getItem('duration')));
          this.addressBack = this.bookingForm.value.addressBack;
          localStorage.setItem('address', JSON.stringify(this.addressBack));
          // console.log('compenent condition 2 local addressForth', JSON.parse(localStorage.getItem('addressForth')));
          // console.log('compenent condition 2 local addressBack', JSON.parse(localStorage.getItem('addressBack')));
          // console.log('compenent condition 2 addressForth',this.addressForth);
          // console.log('compenent condition 2 addressBack',this.addressBack);
          // console.log('compenent condition 2 component distanceForth', this.distanceForth);
          // console.log('compenent condition 2 component  durationForth', this.durationForth);
          // console.log('compenent condition 2 component distanceBack', this.distanceBack);
          // console.log('compenent condition 2 component  durationBack', this.durationBack);
          // console.log('component constion 2 formula', this.formulaBooking);
          // console.log('component constion 2 tarif',this.tarif);
          // console.log('compenent condition 2 local distance', localStorage.removeItem('distance'));
          // console.log('compenent condition 2 local duration', localStorage.removeItem('duration'));
          // console.log('compenent condition 2 local address', localStorage.removeItem('address'));
        }
      });

    }

    // } else {
    //   return this.mapService.calculerDistance(this.addressPartner, this.addressBack)
    //   .then((data) => {
    //     this.distanceBack = data.distanceBack;
    //     this.durationBack = data.durationBack;
    //     this.formulaBooking = this.bookingForm.value.formulaBooking;
    //     this.tarif = this.mapService.calculTarifTwoAddress(this.distanceBack, this.formulaBooking);
    //     localStorage.setItem('tarif', JSON.stringify(this.tarif));
    //     console.log('compenent condition 2 local distance', JSON.parse(localStorage.getItem('distance')));
    //     console.log('compenent condition 2 local duration', JSON.parse(localStorage.getItem('duration')));
    //     localStorage.setItem('addressForth', JSON.stringify(this.addressForth));
    //     localStorage.setItem('addressBack', JSON.stringify(this.addressBack));
    //     console.log('compenent condition 2 local addressForth', JSON.parse(localStorage.getItem('addressForth')));
    //     console.log('compenent condition 2 local addressBack', JSON.parse(localStorage.getItem('addressBack')));
    //     console.log('compenent condition 2 addressForth',this.addressForth);
    //     console.log('compenent condition 2 addressBack',this.addressBack);
    //     console.log('compenent condition 2 distanceForth', this.distanceForth);
    //     console.log('compenent condition 2 durationback', this.durationForth);
    //     console.log('component constion 2 formula', this.formulaBooking);
    //     console.log('component constion 2 tarif',this.tarif);
    //     console.log('compenent condition 2 local distance', localStorage.removeItem('distance'));
    //     console.log('compenent condition 2 local duration', localStorage.removeItem('duration'));
    //   });
    // } else if (this.addressForth != undefined && this.addressBack != undefined) {
    //   (
    //     this.mapService.calculerDistance(this.addressForth, this.addressPartner)
    //     .then((data) => {
    //       this.distanceForth = data.distance;
    //       this.durationForth = data.duration;
    //       localStorage.setItem('distanceForth', JSON.stringify(this.distanceForth));
    //       localStorage.setItem('durationForth', JSON.stringify(this.durationForth));
    //     }),
    //     this.mapService.calculerDistance(this.addressPartner, this.addressBack)
    //     .then((data) => {
    //       this.distanceBack = data.distance;
    //       this.durationBack = data.duration;
    //       localStorage.setItem('distanceBack', JSON.stringify(this.distanceBack));
    //       localStorage.setItem('durationBack', JSON.stringify(this.durationBack));
    //     })
    //   );
    //   console.log('compenent condition 3', JSON.parse(localStorage.getItem('distance')));
    //   this.calcul();
    // }
    // // localStorage.removeItem('distance');
    // localStorage.removeItem('temps');


    // calcul() {
    //   this.mapService.calculTarifThreeAddress(this.distanceForth, this.distanceBack, this.formulaBooking);
    //   console.log('tarif condition 3', this.distanceForth);
    //   console.log('tarif condition 3', this.distanceBack);
    //   console.log('tarif condition 3', this.formulaBooking);
    //   console.log('tarif condition 3', this.tarif);
    // }
  }

  getCar() {
  }


  onSubmitFormBooking(): void {
    const formValue = this.bookingForm.value;
    const newBooking = new Booking ();
    newBooking.addressForth = this.addressForth;
    newBooking.addressPartner = this.addressPartner;
    newBooking.addressBack = this.addressBack;
    newBooking.durationForth = this.durationForth;
    newBooking.distanceForth = this.distanceForth;
    newBooking.distanceBack = this.distanceBack;
    newBooking.durationBack = this.durationBack;
    newBooking.formulaBooking = this.formulaBooking;
    newBooking.firstNameCustomer = this.bookingForm.value.firstNameCustomer;
    newBooking.lastNameCustomer = this.bookingForm.value.lastNameCustomer;
    newBooking.mailCustomer = this.bookingForm.value.mailCustomer;
    newBooking.phoneCustomer = this.bookingForm.value.phoneCustomer;
    newBooking.dateOfBirthdayCustomer = this.bookingForm.value.dateOfBirthdayCustomer;
    newBooking.price = this.tarif;
    console.log(newBooking);
  }
  rebuilderForm(){
    this.bookingForm.reset(
      {
        address: '',
        addressForth: '',
        addressBack: ''
      }
    )
  }
}
