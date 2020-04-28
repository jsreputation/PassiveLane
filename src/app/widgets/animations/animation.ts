import {Animation, NavOptions} from '@ionic/core';

export function fadeAnimation(AnimationC: Animation, _: HTMLElement, opts: TransitionOptions): Promise<Animation> {

  const TRANSLATE_DIRECTION = 'translateX';
  const OFF_BOTTOM = '0%';
  const CENTER = '0px';
  const enteringEl = opts.enteringEl;
  const leavingEl = opts.leavingEl;
  const ionPageElement = getIonPageElement(enteringEl);
  const rootTransition = new AnimationC();

  rootTransition
    .addElement(ionPageElement)
    .beforeRemoveClass('ion-page-invisible');

  const backDirection = (opts.direction === 'back');

  // animate the component itself
  if (backDirection) {
    // rootTransition
    // .duration(opts.duration || 150)
    //    .fromTo('opacity', 0, 1)
    //    .easing('ease-out');

  } else {
    rootTransition
      .duration(opts.duration || 150)
      .fromTo('opacity', 0, 1)
      .easing('ease-out');
  }

  // Animate toolbar if it's there
  const enteringToolbarEle = ionPageElement.querySelector('ion-toolbar');
  if (enteringToolbarEle) {
    const enteringToolBar = new AnimationC();
    enteringToolBar.addElement(enteringToolbarEle);
    rootTransition.add(enteringToolBar);
  }

  // setup leaving view
  if (leavingEl && backDirection) {
    // rootTransition
    // .duration(opts.duration || 150)
    //    .fromTo('opacity', 0, 1)
    //    .easing('ease-out');

    const leavingPage = new AnimationC();
    leavingPage
      .addElement(getIonPageElement(leavingEl))
      .fromTo('opacity', 0, 1)
      .duration(150)
      .easing('ease-out');

    rootTransition.add(leavingPage);
  }

  return Promise.resolve(rootTransition);
}

export interface TransitionOptions extends NavOptions {
  progressCallback?: ((ani: Animation | undefined) => void);
  window: Window;
  baseEl: any;
  enteringEl: HTMLElement;
  leavingEl: HTMLElement | undefined;
}

function getIonPageElement(element: HTMLElement) {
  if (element.classList.contains('ion-page')) {
    return element;
  }
  const ionPage = element.querySelector(':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs');
  if (ionPage) {
    return ionPage;
  }
  return element;
}
