import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddressConfirmPage } from './address-confirm.page';

describe('AddressConfirmPage', () => {
  let component: AddressConfirmPage;
  let fixture: ComponentFixture<AddressConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressConfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddressConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
