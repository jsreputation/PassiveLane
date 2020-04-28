import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild} from '@angular/core';
import {BasicInfoFormComponent} from '../../../../widgets/components/profile/basic-info-form/basic-info-form.component';
import {DynamicHostDirective} from '../dynamic-host.directive';

@Component({
  selector: 'app-dynamic-host-slot',
  templateUrl: './dynamic-host-slot.component.html',
  styleUrls: ['./dynamic-host-slot.component.scss'],
})
export class DynamicHostSlotComponent implements OnInit {

  @ViewChild(DynamicHostDirective, {static: true}) host: DynamicHostDirective;

  @Input() factory;

  constructor(
      private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.factory);

    const viewContainerRef = this.host.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
    // send data to resolved component here
  }

}
