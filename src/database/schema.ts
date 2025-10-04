import {
  uuid,
  pgTable,
  pgEnum,
  text,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["admin", "customer"]);
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "cancelled",
  "shipped",
]);

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: userRoleEnum("role").notNull().default("customer"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
  orders: many(orders),
}));

export const products = pgTable("products", {
  id: uuid().defaultRandom().primaryKey(),
  title: text().notNull(),
  description: text().notNull(),
  slug: text().notNull(),
  userId: uuid("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  user: one(users, {
    fields: [products.userId],
    references: [users.id],
  }),
  variants: many(productVariants),
}));

export const productVariants = pgTable("product_variants", {
  id: uuid().defaultRandom().primaryKey(),
  title: text().notNull(),
  imagesUrls: text("images_urls").array(),
  slug: text().notNull(),
  priceInCents: integer("price_in_cents").notNull(),
  productId: uuid("product_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productVariantsRelations = relations(
  productVariants,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
    options: many(variantOptions),
  }),
);

export const variantOptions = pgTable("variant_options", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  productVariantId: uuid("product_variant_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const variantOptionsRelations = relations(
  variantOptions,
  ({ one, many }) => ({
    productVariant: one(productVariants, {
      fields: [variantOptions.productVariantId],
      references: [productVariants.id],
    }),
    values: many(variantOptionsValues),
  }),
);

export const variantOptionsValues = pgTable("variant_options_values", {
  id: uuid().defaultRandom().primaryKey(),
  value: text().notNull(),
  isSoldOut: boolean("is_sold_out").notNull(),
  variantOptionId: uuid("variant_option_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const variantOptionsValuesRelations = relations(
  variantOptionsValues,
  ({ one, many }) => ({
    option: one(variantOptions, {
      fields: [variantOptionsValues.variantOptionId],
      references: [variantOptions.id],
    }),
  }),
);

export const orders = pgTable("orders", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull(),
  status: orderStatusEnum("order_status").notNull().default("pending"),
  totalInCents: integer("total_in_cents").notNull(),
  shippingAddress: text("shipping_address").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItems = pgTable("order_items", {
  id: uuid().defaultRandom().primaryKey(),
  orderId: uuid("order_id").notNull(),
  quantity: integer("quantity").notNull(),
  unitPriceInCents: integer("unit_price_in_cents").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItemsRelations = relations(orderItems, ({ one, many }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));

export const orderItemDetails = pgTable("order_items_details", {
  id: uuid().defaultRandom().primaryKey(),
  orderItemId: uuid("order_item_id").notNull(),
  productVariantId: uuid("product_variant_id").notNull(),
  variantOptionId: uuid("variant_option_id").notNull(),
  variantOptionValueId: uuid("variant_option_value_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItemDetailsRelations = relations(
  orderItemDetails,
  ({ one }) => ({
    orderItem: one(orderItems, {
      fields: [orderItemDetails.orderItemId],
      references: [orderItems.id],
    }),
  }),
);
