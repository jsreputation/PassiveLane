import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CertificatePage } from './certificate.page';

describe('CertificatePage', () => {
  let component: CertificatePage;
  let fixture: ComponentFixture<CertificatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CertificatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
