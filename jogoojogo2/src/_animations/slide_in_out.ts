import { trigger,query,group, state, animate, transition, style } from '@angular/animations';

export const slideInOutAnimation =
  trigger('slideInOutAnimation', [

    // end state styles for route container (host)
    state('*', style({
      // the view covers the whole screen with a semi tranparent background
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      //backgroundColor: 'rgba(17,17,17, 0.8)'
    })),
    transition(':enter', [
      style({transform: 'translateX(400%)'}),
      animate('0.7s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.7s ease-in-out', style({transform: 'translateX(-400%)'}))
    ])
  ]);
