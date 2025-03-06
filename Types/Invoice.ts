import { Types } from "mongoose";
import { ProductDocument } from "./Product";

export interface InvoiceBasic {
  purchaseId: String;
  buyer: Types.ObjectId;
  products: Array<ProductDocument>;
  total: number;
  paymentMethod: string;
  purchasedAt: Date;
  status: "successful" | "cancelled" | "processed" | "refunded";
  notes?: string;
}

export type InvoiceDocument = InvoiceBasic;
