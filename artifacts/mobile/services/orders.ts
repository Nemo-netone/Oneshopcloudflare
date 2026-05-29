import type { CartItem } from "@/context/AppContext";

export type CustomerInfo = {
  name: string;
  phone: string;
  address: string;
  note?: string;
};

export type OrderItemPayload = {
  productId: string;
  productName: string;
  productSpec: string;
  productPrice: number;
  quantity: number;
};

export type CreateOrderPayload = {
  customer: CustomerInfo;
  items: OrderItemPayload[];
  subtotalAmount: number;
  discountAmount: number;
  shippingAmount: number;
  totalAmount: number;
};

export type OrderRecord = {
  orderNo: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  note: string | null;
  subtotalAmount: number;
  discountAmount: number;
  shippingAmount: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: Array<{
    productId: string;
    productName: string;
    productSpec: string | null;
    productPrice: number;
    quantity: number;
    subtotal: number;
  }>;
};

export function cartItemsToOrderItems(items: CartItem[]): OrderItemPayload[] {
  return items.map((item) => ({
    productId: item.id,
    productName: item.name,
    productSpec: item.spec,
    productPrice: item.price,
    quantity: item.qty,
  }));
}

export async function createOrder(payload: CreateOrderPayload): Promise<OrderRecord> {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || "订单提交失败，请稍后重试");
  }

  return data.order as OrderRecord;
}

export async function queryOrder(orderNo: string, phone: string): Promise<OrderRecord> {
  const params = new URLSearchParams({ orderNo, phone });
  const response = await fetch(`/api/orders?${params.toString()}`);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || "订单查询失败，请检查订单号和手机号");
  }

  return data.order as OrderRecord;
}
