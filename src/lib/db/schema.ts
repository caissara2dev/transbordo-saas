import {
  AnyPgColumn,
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar
} from "drizzle-orm/pg-core";

export const platformRoleEnum = pgEnum("platform_role", ["NONE", "PLATFORM_ADMIN"]);
export const organizationRoleEnum = pgEnum("organization_role", ["ORG_ADMIN", "MANAGER", "OPERATOR"]);
export const membershipStatusEnum = pgEnum("membership_status", ["INVITED", "ACTIVE", "SUSPENDED"]);
export const invitationStatusEnum = pgEnum("invitation_status", ["PENDING", "ACCEPTED", "REVOKED", "EXPIRED"]);
export const shiftTypeEnum = pgEnum("shift_type", ["MORNING", "NIGHT"]);
export const pumpEnum = pgEnum("pump", ["LINE_01", "LINE_02"]);
export const categoryEnum = pgEnum("category", [
  "PRODUCTIVE",
  "IN_TRANSIT",
  "WAITING_LAB",
  "NO_TRUCK",
  "NO_CONTAINER",
  "MAINTENANCE",
  "OTHER"
]);

export const organizations = pgTable(
  "organizations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    legalName: text("legal_name"),
    status: text("status").notNull().default("active"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => ({
    organizationsSlugIdx: uniqueIndex("organizations_slug_idx").on(table.slug)
  })
);

export const userProfiles = pgTable(
  "user_profiles",
  {
    id: uuid("id").primaryKey(),
    email: text("email").notNull(),
    fullName: text("full_name"),
    platformRole: platformRoleEnum("platform_role").notNull().default("NONE"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => ({
    userProfilesEmailIdx: uniqueIndex("user_profiles_email_idx").on(table.email)
  })
);

export const organizationMemberships = pgTable(
  "organization_memberships",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => userProfiles.id, { onDelete: "cascade" }),
    role: organizationRoleEnum("role").notNull(),
    status: membershipStatusEnum("status").notNull().default("INVITED"),
    joinedAt: timestamp("joined_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => ({
    membershipsOrgUserIdx: uniqueIndex("memberships_org_user_idx").on(table.organizationId, table.userId),
    membershipsOrgRoleIdx: index("memberships_org_role_idx").on(table.organizationId, table.role)
  })
);

export const organizationSettings = pgTable(
  "organization_settings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    timezone: text("timezone").notNull().default("America/Sao_Paulo"),
    approvalContactPhone: text("approval_contact_phone"),
    operationsLabel: text("operations_label").notNull().default("Transbordo"),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    updatedByMembershipId: uuid("updated_by_membership_id").references(
      (): AnyPgColumn => organizationMemberships.id
    )
  },
  (table) => ({
    organizationSettingsOrgIdx: uniqueIndex("organization_settings_org_idx").on(table.organizationId)
  })
);

export const organizationInvitations = pgTable(
  "organization_invitations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: organizationRoleEnum("role").notNull(),
    status: invitationStatusEnum("status").notNull().default("PENDING"),
    invitedByMembershipId: uuid("invited_by_membership_id").references(
      (): AnyPgColumn => organizationMemberships.id
    ),
    acceptedByUserId: uuid("accepted_by_user_id").references((): AnyPgColumn => userProfiles.id),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => ({
    invitationsOrgEmailIdx: index("invitations_org_email_idx").on(table.organizationId, table.email)
  })
);

export const clients = pgTable(
  "clients",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    nameUpper: text("name_upper").notNull(),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    createdByMembershipId: uuid("created_by_membership_id")
      .notNull()
      .references(() => organizationMemberships.id),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    updatedByMembershipId: uuid("updated_by_membership_id")
      .notNull()
      .references(() => organizationMemberships.id)
  },
  (table) => ({
    clientsOrgNameIdx: uniqueIndex("clients_org_name_idx").on(table.organizationId, table.nameUpper)
  })
);

export const events = pgTable(
  "events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    pump: pumpEnum("pump").notNull(),
    shiftDate: date("shift_date", { mode: "string" }).notNull(),
    shiftType: shiftTypeEnum("shift_type").notNull(),
    startTime: varchar("start_time", { length: 5 }).notNull(),
    endTime: varchar("end_time", { length: 5 }).notNull(),
    category: categoryEnum("category").notNull(),
    productive: boolean("productive").notNull(),
    clientId: uuid("client_id").references(() => clients.id),
    clientNameSnapshot: text("client_name_snapshot"),
    plate: text("plate"),
    container: text("container"),
    notes: text("notes"),
    startAt: timestamp("start_at", { withTimezone: true }).notNull(),
    endAt: timestamp("end_at", { withTimezone: true }).notNull(),
    durationMinutes: integer("duration_minutes").notNull(),
    createdByMembershipId: uuid("created_by_membership_id")
      .notNull()
      .references(() => organizationMemberships.id),
    updatedByMembershipId: uuid("updated_by_membership_id")
      .notNull()
      .references(() => organizationMemberships.id),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deleted: boolean("deleted").notNull().default(false),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    deletedByMembershipId: uuid("deleted_by_membership_id").references(() => organizationMemberships.id),
    deletedReason: text("deleted_reason")
  },
  (table) => ({
    eventsShiftDateIdx: index("events_shift_date_idx").on(table.organizationId, table.shiftDate),
    eventsPumpShiftDateIdx: index("events_pump_shift_date_idx").on(
      table.organizationId,
      table.pump,
      table.shiftDate
    ),
    eventsClientShiftDateIdx: index("events_client_shift_date_idx").on(
      table.organizationId,
      table.clientId,
      table.shiftDate
    ),
    eventsDeletedShiftDateIdx: index("events_deleted_shift_date_idx").on(
      table.organizationId,
      table.deleted,
      table.shiftDate
    ),
    eventsCreatedByIdx: index("events_created_by_idx").on(table.organizationId, table.createdByMembershipId)
  })
);

export const eventRevisions = pgTable(
  "event_revisions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    editedAt: timestamp("edited_at", { withTimezone: true }).notNull().defaultNow(),
    editedByMembershipId: uuid("edited_by_membership_id")
      .notNull()
      .references(() => organizationMemberships.id),
    reason: text("reason"),
    changedFields: text("changed_fields").array().notNull(),
    before: jsonb("before").notNull(),
    after: jsonb("after").notNull()
  },
  (table) => ({
    revisionsOrgEventIdx: index("revisions_org_event_idx").on(table.organizationId, table.eventId)
  })
);
