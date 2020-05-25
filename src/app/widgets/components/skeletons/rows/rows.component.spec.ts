import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RowsComponent } from './rows.component';

describe('RowsComponent', () => {
  let component: RowsComponent;
  let fixture: ComponentFixture<RowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
