export type AccountType = 'challenge' | 'instant';

export interface AccountPlan {
  id: string;
  type: AccountType;
  fundingAmount: number;
  price: number;
  lossLimit: number;
  profitSplit: number;
  features: string[];
}

export type Broker = 'Quotex' | 'Pocket Option' | 'Tradeowix' | 'Binomo' | 'Olymp Trade';

export type PaymentMethod = 'Crypto (BEP20)' | 'SadaPay' | 'PayPal' | 'Binance Pay';

export interface Order {
  id: string;
  plan: AccountPlan;
  broker: Broker;
  status: 'pending' | 'verified' | 'failed';
  date: string;
  email: string;
}

export interface CheckoutState {
  plan: AccountPlan | null;
  broker: Broker | null;
  userDetails: {
    name: string;
    address: string;
    country: string;
    email: string;
  };
  paymentMethod: PaymentMethod | null;
  proofUploaded: boolean;
}
