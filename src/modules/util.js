import logo from '../logo.png';
import bg from '../bg.jpg';

const imgHelper = () => {
  const logoImg = document.querySelector('.logo');
  const myIcon = new Image();
  myIcon.src = logo;
  myIcon.alt = 'Logo icon';
  logoImg.appendChild(myIcon);

  const bgImg = document.querySelector('.bg');
  const myBg = new Image();
  myBg.src = bg;
  myBg.alt = 'background image';
  bgImg.appendChild(myBg);
};

export default imgHelper;
