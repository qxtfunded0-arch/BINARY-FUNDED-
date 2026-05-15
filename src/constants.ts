import { AccountPlan } from './types';

export const CHALLENGE_ACCOUNTS: AccountPlan[] = [
  {
    id: 'ch-2000',
    type: 'challenge',
    fundingAmount: 2000,
    price: 50,
    lossLimit: 200,
    profitSplit: 85,
    features: ['2 Phase Challenge', 'No Time Limit', 'Daily Loss 5%', 'Minimum 5 Trading Days']
  },
  {
    id: 'ch-5000',
    type: 'challenge',
    fundingAmount: 5000,
    price: 110,
    lossLimit: 500,
    profitSplit: 85,
    features: ['2 Phase Challenge', 'No Time Limit', 'Daily Loss 5%', 'Premium Support']
  },
  {
    id: 'ch-8000',
    type: 'challenge',
    fundingAmount: 8000,
    price: 160,
    lossLimit: 800,
    profitSplit: 85,
    features: ['2 Phase Challenge', 'No Time Limit', 'Daily Loss 5%', 'Bi-Weekly Payouts']
  },
  {
    id: 'ch-10000',
    type: 'challenge',
    fundingAmount: 10000,
    price: 190,
    lossLimit: 1000,
    profitSplit: 85,
    features: ['2 Phase Challenge', 'Low Spread Broker', 'Max Drawdown 10%', 'Scale-up Available']
  },
  {
    id: 'ch-12000',
    type: 'challenge',
    fundingAmount: 12000,
    price: 220,
    lossLimit: 1200,
    profitSplit: 85,
    features: ['2 Phase Challenge', 'Lowest Commissions', 'Max Drawdown 12%', 'Dedicated Account Manager']
  }
];

export const INSTANT_ACCOUNTS: AccountPlan[] = [
  {
    id: 'in-2000',
    type: 'instant',
    fundingAmount: 2000,
    price: 70,
    lossLimit: 505,
    profitSplit: 92,
    features: ['Instant Funding', 'No Challenge Required', '92% Profit Split', 'Weekly Withdrawals']
  },
  {
    id: 'in-5000',
    type: 'instant',
    fundingAmount: 5000,
    price: 160,
    lossLimit: 1000,
    profitSplit: 92,
    features: ['Instant Funding', 'No Evaluation', '92% Profit Split', 'Direct Live Account']
  },
  {
    id: 'in-8000',
    type: 'instant',
    fundingAmount: 8000,
    price: 240,
    lossLimit: 1600,
    profitSplit: 92,
    features: ['Instant Funding', 'No Rules', '92% Profit Split', 'Fast Execution']
  },
  {
    id: 'in-10000',
    type: 'instant',
    fundingAmount: 10000,
    price: 290,
    lossLimit: 2000,
    profitSplit: 92,
    features: ['Instant Funding', 'High Leverage', '92% Profit Split', 'Scale to $1M']
  },
  {
    id: 'in-12000',
    type: 'instant',
    fundingAmount: 12000,
    price: 330,
    lossLimit: 2400,
    profitSplit: 92,
    features: ['Instant Funding', 'Elite Benefits', '92% Profit Split', 'Exclusive Signals Access']
  }
];

export const BROKERS = ['Quotex', 'Pocket Option', 'Tradeowix', 'Binomo', 'Olymp Trade'];

export const PAYMENT_DETAILS = {
  crypto: {
    address: '0x87509b4D1592E7c83C8967a5571ca789CbdfbE7d',
    network: 'BEP20 (BSC)',
    logo: 'https://cdn.worldvectorlogo.com/logos/binance-coin-bnb.svg'
  },
  sadapay: {
    name: 'Muhammad HANEEF',
    number: '03220570937',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6s1k5v-R9z7V8HqN8kS8Y6gZ7G1g5G_8A0A&s'
  },
  binancePay: {
    id: '1214053014',
    name: 'BINARY FUNDED',
    logo: 'https://cdn.worldvectorlogo.com/logos/binance-smart-chain-2.svg'
  },
  paypal: {
    email: 'Haneefkhanbaloch0001@gmail.com',
    logo: 'https://cdn.worldvectorlogo.com/logos/paypal-3.svg'
  }
};
