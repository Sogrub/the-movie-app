import { Injectable } from '@angular/core';
import { SweetConfig } from './my-sweet-popup.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MySweetPopupService {

  constructor() { }

  sweetPopup(config: SweetConfig) {
    const { position, icon, text, timer } = config;
    const iconSucess = `<i class="fa-solid fa-thumbs-up"></i>`;
    const iconWarning = `<i class="fa-solid fa-triangle-exclamation"></i>`;
    const iconDanger = `<i class="fa-solid fa-circle-radiation"></i>`;
    let iconPopup = '';
    switch (icon) {
      case 'sucess':
        iconPopup = iconSucess
        break;

      case 'warning':
        iconPopup = iconWarning
        break;

      case 'danger':
        iconPopup = iconDanger
        break;
    
      default:
        iconPopup = iconSucess
        break;
    }
    
    const mySweetElement = document.createElement('div');
    mySweetElement.classList.add('my-sweet-popup', `my-sweet-popup--${position}`, `my-sweet-popup--${icon}`, 'flex', 'flex-align-center');

    const spanIconElement = document.createElement('span');
    spanIconElement.classList.add('icon', 'text');
    spanIconElement.innerHTML = iconPopup;

    const spanTextElement = document.createElement('span');
    spanTextElement.classList.add('text');
    spanTextElement.innerText = text;

    const spanCloseElement = document.createElement('span');
    spanCloseElement.classList.add('close', 'text');
    spanCloseElement.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`;
    spanCloseElement.addEventListener('click', () => {
      mySweetElement.remove();
    })
    
    mySweetElement.appendChild(spanIconElement);
    mySweetElement.appendChild(spanTextElement);
    mySweetElement.appendChild(spanCloseElement);

    document.body.appendChild(mySweetElement);

    if (timer) {
      setTimeout(() => {
        mySweetElement.remove();
      }, timer);
    }
  }
}
