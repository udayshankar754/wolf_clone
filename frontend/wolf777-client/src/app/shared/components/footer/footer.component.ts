import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  paymentMethods = [
    { name: 'UPI', image: 'assets/images/payment/upi.png' },
    { name: 'NetBanking', image: 'assets/images/payment/netbanking.png' },
    { name: 'Paytm', image: 'assets/images/payment/paytm.png' },
    { name: 'Google Pay', image: 'assets/images/payment/gpay.png' },
    { name: 'PhonePe', image: 'assets/images/payment/phonepe.png' },
    { name: 'Bitcoin', image: 'assets/images/payment/bitcoin.png' }
  ];

  footerLinks = [
    {
      title: 'Sports',
      links: [
        { name: 'Cricket', url: '/sports/cricket' },
        { name: 'Football', url: '/sports/football' },
        { name: 'Tennis', url: '/sports/tennis' },
        { name: 'Basketball', url: '/sports/basketball' },
        { name: 'Horse Racing', url: '/sports/horse-racing' }
      ]
    },
    {
      title: 'Casino',
      links: [
        { name: 'Slots', url: '/casino/slots' },
        { name: 'Live Casino', url: '/casino/live' },
        { name: 'Table Games', url: '/casino/table-games' },
        { name: 'Indian Games', url: '/casino/indian-games' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', url: '/about' },
        { name: 'Terms & Conditions', url: '/terms' },
        { name: 'Privacy Policy', url: '/privacy' },
        { name: 'Responsible Gambling', url: '/responsible-gambling' },
        { name: 'Contact Us', url: '/contact' }
      ]
    },
    {
      title: 'Help',
      links: [
        { name: 'FAQ', url: '/faq' },
        { name: 'How to Deposit', url: '/help/deposit' },
        { name: 'How to Withdraw', url: '/help/withdraw' },
        { name: 'Betting Rules', url: '/help/betting-rules' }
      ]
    }
  ];

  socialLinks = [
    { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/' },
    { name: 'Twitter', icon: 'twitter', url: 'https://www.twitter.com/' },
    { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/' },
    { name: 'Telegram', icon: 'telegram', url: 'https://www.telegram.org/' }
  ];
}