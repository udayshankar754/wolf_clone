export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/v1',
  socketUrl: 'ws://localhost:3000/socket',
  recaptchaSiteKey: '6LeSomeRandomKey',
  analytics: {
    googleAnalyticsId: '',
    facebookPixelId: '',
  },
  oddsUpdateInterval: 10000, // milliseconds
  liveBettingUpdateInterval: 5000, // milliseconds
  liveScoreUpdateInterval: 5000, // milliseconds
  betslipUpdateInterval: 10000, // milliseconds
  maxBetSlipSelections: 20,
  maxSystemBets: 8,
  cryptoPaymentEnabled: true,
  appVersion: '1.0.0-dev'
};