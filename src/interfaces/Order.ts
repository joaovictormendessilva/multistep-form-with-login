export interface Order {
  name: string;
  email: string;
  phone: string;
  plan: string;
  services: string[];
  monthlyOrYearly: string;
  planPrice: number;
  total: number;
}