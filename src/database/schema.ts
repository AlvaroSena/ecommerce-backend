import { uuid, pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
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

export const productVariantsRelations = relations(productVariants, ({ one, many }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
  options: many(variantOptions),
}));

export const variantOptions = pgTable("variant_options", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  productVariantId: uuid("product_variant_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const variantOptionsRelations = relations(variantOptions, ({ one, many }) => ({
  productVariant: one(productVariants, {
    fields: [variantOptions.productVariantId],
    references: [productVariants.id],
  }),
  values: many(variantOptionsValues),
}))

export const variantOptionsValues = pgTable("variant_options_values", {
  id: uuid().defaultRandom().primaryKey(),
  value: text().notNull(),
  isSoldOut: boolean("is_sold_out").notNull(),
  variantOptionId: uuid("variant_option_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const variantOptionsValuesRelations = relations(variantOptionsValues, ({ one, many }) => ({
  option: one(variantOptions, {
    fields: [variantOptionsValues.variantOptionId],
    references: [variantOptions.id],
  })
}));
