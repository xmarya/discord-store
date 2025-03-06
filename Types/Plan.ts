
export interface Plan {
  name: string;
  price: number;
}

export interface PlanDetails extends Plan {
  features: Array<string>;
  thisMonthSubscribers?: number;
  lastMonthSubscribers?: number;
  discount?: number;
}

export interface PlanQuota extends Plan {
  quota: {
    ofProducts: number;
    ofCategories: number;
    ofStoreAssistants: number;
    ofColourThemes: number;
    ofCommission: number;
  };
}

