export interface Order {
  name: string;
  email: string;
  phone: string;
  plan: string;
  services: string[];
  monthlyOrYearly: boolean;
  planPrice: number;
  total: number;
}