import logo from '../logo.png';
import bg from '../bg.jpg';

const imgHelper = () => {
  const logoImg = document.querySelector('.logo');
  const myIcon = new Image();
  myIcon.setAttribute('href', '/');
  myIcon.classList.add('spaLink');
  myIcon.src = logo;
  logoImg.appendChild(myIcon);

  const bgImg = document.querySelector('.bg');
  const myBg = new Image();
  myBg.src = bg;
  bgImg.appendChild(myBg);
};

export const encodeHTMLEntities = (rawStr) => rawStr.replace(/[\u00A0-\u9999<>&]/g, ((i) => `&#${i.charCodeAt(0)};`));

export { imgHelper };
