import {Animation} from '@ionic/core';

export function myEnterAnimation(AnimationC: Animation, baseEl: HTMLElement): Promise<Animation> {

  const baseAnimation = new AnimationC();

  const backdropAnimation = new AnimationC();
  backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

  const wrapperAnimation = new AnimationC();
  wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

  wrapperAnimation.beforeStyles({opacity: 1})
    .fromTo('translateX', '0%', '0%');

  backdropAnimation.fromTo('opacity', 0.01, 0.3);

  return Promise.resolve(baseAnimation
    .addElement(baseEl)
    .fromTo('opacity', 0, 1)
    .duration(200)
    .easing('ease-in')
    .beforeAddClass('show-modal')
    .add(backdropAnimation)
    .add(wrapperAnimation));


}
