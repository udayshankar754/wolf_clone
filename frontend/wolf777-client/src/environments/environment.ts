export const environment = {
  production: true,
  apiUrl: 'https://api.wolf777.com/v1',
  socketUrl: 'wss://api.wolf777.com/socket',
  recaptchaSiteKey: '6LeSomeRandomKey',
  analytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    facebookPixelId: 'XXXXXXXXXXXX',
  },
  oddsUpdateInterval: 10000, // milliseconds
  liveBettingUpdateInterval: 5000, // milliseconds
  liveScoreUpdateInterval: 5000, // milliseconds
  betslipUpdateInterval: 10000, // milliseconds
  maxBetSlipSelections: 20,
  maxSystemBets: 8,
  cryptoPaymentEnabled: true,
  appVersion: '1.0.0'
};