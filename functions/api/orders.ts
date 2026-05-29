type Env = {
  DB: D1Database;
};

type OrderItemInput = {
  productId?: unknown;
  productName?: unknown;
  productSpec?: unknown;
  productPrice?: unknown;
  quantity?: unknown;
};

type CreateOrderInput = {
  customer?: {
    name?: unknown;
    phone?: unknown;
    address?: unknown;
    note?: unknown;
  };
  items?: OrderItemInput[];
  subtotalAmount?: unknown;
  discountAmount?: unknown;
  shippingAmount?: unknown;
  totalAmount?: unknown;
};

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...init.headers,
    },
  });
}

function badRequest(message: string) {
  return json({ error: message }, { status: 400 });
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeAmount(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return Number.NaN;
  }
  return Math.round(value * 100) / 100;
}

function createOrderNo() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `GT${Date.now()}${random}`;
}

function mapOrderRow(row: any, items: any[]) {
  return {
    orderNo: row.order_no,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    customerAddress: row.customer_address,
    note: row.note,
    subtotalAmount: row.subtotal_amount,
    discountAmount: row.discount_amount,
    shippingAmount: row.shipping_amount,
    totalAmount: row.total_amount,
    status: row.status,
    createdAt: row.created_at,
    items: items.map((item) => ({
      productId: item.product_id,
      productName: item.product_name,
      productSpec: item.product_spec,
      productPrice: item.product_price,
      quantity: item.quantity,
      subtotal: item.subtotal,
    })),
  };
}

async function handleCreateOrder(request: Request, env: Env) {
  let body: CreateOrderInput;

  try {
    body = await request.json();
  } catch {
    return badRequest("请求体必须是 JSON");
  }

  const customerName = normalizeString(body.customer?.name);
  const customerPhone = normalizeString(body.customer?.phone);
  const customerAddress = normalizeString(body.customer?.address);
  const note = normalizeString(body.customer?.note) || null;

  if (!customerName) return badRequest("请填写收货人姓名");
  if (!/^1\d{10}$/.test(customerPhone)) return badRequest("请填写 11 位中国大陆手机号");
  if (!customerAddress) return badRequest("请填写收货地址");

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return badRequest("订单至少需要包含一件商品");
  }

  const items = body.items.map((item) => {
    const productId = normalizeString(item.productId);
    const productName = normalizeString(item.productName);
    const productSpec = normalizeString(item.productSpec);
    const productPrice = normalizeAmount(item.productPrice);
    const quantity = typeof item.quantity === "number" ? Math.floor(item.quantity) : Number.NaN;

    return {
      productId,
      productName,
      productSpec,
      productPrice,
      quantity,
      subtotal: Math.round(productPrice * quantity * 100) / 100,
    };
  });

  for (const item of items) {
    if (!item.productId || !item.productName) return badRequest("商品信息不完整");
    if (!Number.isFinite(item.productPrice) || item.productPrice < 0) return badRequest("商品价格无效");
    if (!Number.isFinite(item.quantity) || item.quantity <= 0) return badRequest("商品数量无效");
  }

  const subtotalAmount = normalizeAmount(body.subtotalAmount);
  const discountAmount = normalizeAmount(body.discountAmount);
  const shippingAmount = normalizeAmount(body.shippingAmount);
  const totalAmount = normalizeAmount(body.totalAmount);

  if (![subtotalAmount, discountAmount, shippingAmount, totalAmount].every(Number.isFinite)) {
    return badRequest("订单金额无效");
  }

  const calculatedSubtotal = Math.round(items.reduce((sum, item) => sum + item.subtotal, 0) * 100) / 100;
  if (Math.abs(calculatedSubtotal - subtotalAmount) > 0.01) {
    return badRequest("订单商品金额与明细不一致");
  }

  const calculatedTotal = Math.max(0, Math.round((subtotalAmount - discountAmount + shippingAmount) * 100) / 100);
  if (Math.abs(calculatedTotal - totalAmount) > 0.01) {
    return badRequest("订单总金额计算不一致");
  }

  const orderNo = createOrderNo();

  const insertOrder = await env.DB.prepare(
    `INSERT INTO orders (
      order_no,
      customer_name,
      customer_phone,
      customer_address,
      note,
      subtotal_amount,
      discount_amount,
      shipping_amount,
      total_amount,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
  )
    .bind(
      orderNo,
      customerName,
      customerPhone,
      customerAddress,
      note,
      subtotalAmount,
      discountAmount,
      shippingAmount,
      totalAmount,
    )
    .run();

  const orderId = insertOrder.meta.last_row_id;
  if (!orderId) {
    return json({ error: "订单创建失败" }, { status: 500 });
  }

  await env.DB.batch(
    items.map((item) =>
      env.DB.prepare(
        `INSERT INTO order_items (
          order_id,
          product_id,
          product_name,
          product_spec,
          product_price,
          quantity,
          subtotal
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ).bind(
        orderId,
        item.productId,
        item.productName,
        item.productSpec,
        item.productPrice,
        item.quantity,
        item.subtotal,
      ),
    ),
  );

  const order = await env.DB.prepare("SELECT * FROM orders WHERE id = ?").bind(orderId).first();
  const savedItems = await env.DB.prepare("SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC")
    .bind(orderId)
    .all();

  return json({ order: mapOrderRow(order, savedItems.results || []) }, { status: 201 });
}

async function handleQueryOrder(request: Request, env: Env) {
  const url = new URL(request.url);
  const orderNo = normalizeString(url.searchParams.get("orderNo"));
  const phone = normalizeString(url.searchParams.get("phone"));

  if (!orderNo) return badRequest("请填写订单号");
  if (!/^1\d{10}$/.test(phone)) return badRequest("请填写 11 位中国大陆手机号");

  const order = await env.DB.prepare(
    "SELECT * FROM orders WHERE order_no = ? AND customer_phone = ? LIMIT 1",
  )
    .bind(orderNo, phone)
    .first();

  if (!order) {
    return json({ error: "没有找到对应订单，请检查订单号和手机号" }, { status: 404 });
  }

  const items = await env.DB.prepare("SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC")
    .bind((order as any).id)
    .all();

  return json({ order: mapOrderRow(order, items.results || []) });
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) {
    return json({ error: "D1 数据库未绑定，请在 Cloudflare Pages 中配置 DB 绑定" }, { status: 500 });
  }

  if (request.method === "POST") {
    return handleCreateOrder(request, env);
  }

  if (request.method === "GET") {
    return handleQueryOrder(request, env);
  }

  return json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "GET, POST" } });
};
