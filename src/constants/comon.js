export const baseHost = 'https://api.ezfrontend.com';
const randomImg = [
  'https://cdn.tgdd.vn/Products/Images/42/262402/Samsung-Galaxy-A13-cam-thumb-600x600.jpg',
  'https://cdn.tgdd.vn/Products/Images/42/230529/TimerThumb/iphone-13-pro-max-(8).jpg',
  'https://cdn.tgdd.vn/Products/Images/44/263980/acer-nitro-5-gaming-an515-45-r6ev-r5-5600h-8gb-600x600.jpg',
  'https://cdn.tgdd.vn/Products/Images/44/272005/lenovo-gaming-legion-5-15ith6-i7-82jk00fnvn-180322-100552-600x600.jpg',
];
export function randomPhoto() {
  return randomImg[Math.trunc(Math.random() * randomImg.length)];
}
