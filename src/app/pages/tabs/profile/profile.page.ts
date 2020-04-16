import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {HeaderService} from '../../../services/UI/header.service';
import {DynamicHostDirective} from '../dynamic-host/dynamic-host.directive';
import {BasicInfoFormComponent} from '../../../widgets/components/profile/basic-info-form/basic-info-form.component';
import {AddressFormComponent} from '../../../widgets/components/profile/address-form/address-form.component';
import {ContactNumberFormComponent} from '../../../widgets/components/profile/contact-number-form/contact-number-form.component';
import {ChangePasswordFormComponent} from '../../../widgets/components/profile/change-password-form/change-password-form.component';
import {BankDetailsFormComponent} from '../../../widgets/components/profile/bank-details-form/bank-details-form.component';
import {GotoInvestorTypeFormComponent} from '../../../widgets/components/profile/goto-investor-type-form/goto-investor-type-form.component';
import {SignatureFormComponent} from '../../../widgets/components/profile/signature-form/signature-form.component';
import {ProofOfIdComponent} from "../../../widgets/components/profile/proof-of-id/proof-of-id.component";
import {IonContent} from "@ionic/angular";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;

  @ViewChild(DynamicHostDirective, {static: true}) host: DynamicHostDirective;

  public ScrollAnimation = '';

  private hidden = false;
  private triggerDistance = 42;
  public user_info;

  public items: any = [];

  constructor(
    private renderer: Renderer2,
    private headerService: HeaderService,
  ) {
  }

  ngOnInit() {
    this.items = [
      { headerTxt: 'Basic Information', expanded: true, componentClass: BasicInfoFormComponent },
      { headerTxt: 'Proof of Id', expanded: false, componentClass: ProofOfIdComponent },
      { headerTxt: 'Address', expanded: false, componentClass: AddressFormComponent },
      { headerTxt: 'Contact Number', expanded: false, componentClass: ContactNumberFormComponent },
      { headerTxt: 'Change Password', expanded: false, componentClass: ChangePasswordFormComponent },
      { headerTxt: 'Bank Details', expanded: false, componentClass: BankDetailsFormComponent },
      { headerTxt: 'Type of User', expanded: false, componentClass: GotoInvestorTypeFormComponent},
      { headerTxt: 'Signature', expanded: false, componentClass: SignatureFormComponent },
    ];
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item === listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  ionViewWillEnter() {
  }

  ionViewWillLeave() {
    if (!this.hidden) {
      this.headerService.headerClear(this.renderer, this.ionHeader.el, this.headerTitle.nativeElement, this.headerTxt.el);
    }
  }

  scroll(ev: any) {

    if (!this.hidden && ev.detail.currentY > this.triggerDistance) {
      this.hidden = true;
      return this.headerService.headerHide(this.renderer, this.ionHeader.el, this.headerTitle.nativeElement, this.headerTxt.el);
    } else if (this.hidden && ev.detail.currentY <= this.triggerDistance) {
      this.hidden = false;
      return this.headerService.headerShow(this.renderer, this.ionHeader.el, this.headerTitle.nativeElement, this.headerTxt.el);
    }
  }
}
