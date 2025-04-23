import { Component, Injector, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { AddressServiceProxy, CreateAddressDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-address-dialog',
  templateUrl: './create-address-dialog.component.html'
})
export class CreateAddressDialogComponent extends AppComponentBase {
  address: any = {
    country: '',
    state: '',
    city: ''
  };

  countries = [
    {
      name: 'India',
      states: [
        { name: 'Delhi', cities: ['New Delhi', 'Dwarka'] },
        { name: 'Maharashtra', cities: ['Mumbai', 'Pune'] },
        { name: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur'] }
      ]
    },
    {
      name: 'USA',
      states: [
        { name: 'California', cities: ['Los Angeles', 'San Francisco'] },
        { name: 'Texas', cities: ['Houston', 'Dallas'] },
        { name: 'New York', cities: ['New York City', 'Buffalo'] }
      ]
    }
  ];

  states: { name: string; cities: string[] }[] = [];
  cities: string[] = [];

  saving = false;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _addressservice: AddressServiceProxy
  ) {
    super(injector);
  }

  onCountryChange() {
    const selected = this.countries.find(c => c.name === this.address.country);
    this.states = selected ? selected.states : [];
    this.address.state = '';
    this.cities = [];
  }

  onStateChange() {
    const selectedCountry = this.countries.find(c => c.name === this.address.country);
    const selectedState = selectedCountry?.states.find(s => s.name === this.address.state);
    this.cities = selectedState ? selectedState.cities : [];
    this.address.city = '';
  }

  save(): void {
    this.saving = true;

    this._addressservice
      .create(this.address)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
