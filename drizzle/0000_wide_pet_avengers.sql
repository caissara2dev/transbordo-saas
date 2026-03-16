CREATE EXTENSION IF NOT EXISTS btree_gist;--> statement-breakpoint
CREATE TYPE "public"."category" AS ENUM('PRODUCTIVE', 'IN_TRANSIT', 'WAITING_LAB', 'NO_TRUCK', 'NO_CONTAINER', 'MAINTENANCE', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."invitation_status" AS ENUM('PENDING', 'ACCEPTED', 'REVOKED', 'EXPIRED');--> statement-breakpoint
CREATE TYPE "public"."membership_status" AS ENUM('INVITED', 'ACTIVE', 'SUSPENDED');--> statement-breakpoint
CREATE TYPE "public"."organization_role" AS ENUM('ORG_ADMIN', 'MANAGER', 'OPERATOR');--> statement-breakpoint
CREATE TYPE "public"."platform_role" AS ENUM('NONE', 'PLATFORM_ADMIN');--> statement-breakpoint
CREATE TYPE "public"."pump" AS ENUM('LINE_01', 'LINE_02');--> statement-breakpoint
CREATE TYPE "public"."shift_type" AS ENUM('MORNING', 'NIGHT');--> statement-breakpoint
CREATE TABLE "clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"name" text NOT NULL,
	"name_upper" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by_membership_id" uuid NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by_membership_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_revisions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"event_id" uuid NOT NULL,
	"edited_at" timestamp with time zone DEFAULT now() NOT NULL,
	"edited_by_membership_id" uuid NOT NULL,
	"reason" text,
	"changed_fields" text[] NOT NULL,
	"before" jsonb NOT NULL,
	"after" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"pump" "pump" NOT NULL,
	"shift_date" date NOT NULL,
	"shift_type" "shift_type" NOT NULL,
	"start_time" varchar(5) NOT NULL,
	"end_time" varchar(5) NOT NULL,
	"category" "category" NOT NULL,
	"productive" boolean NOT NULL,
	"client_id" uuid,
	"client_name_snapshot" text,
	"plate" text,
	"container" text,
	"notes" text,
	"start_at" timestamp with time zone NOT NULL,
	"end_at" timestamp with time zone NOT NULL,
	"duration_minutes" integer NOT NULL,
	"created_by_membership_id" uuid NOT NULL,
	"updated_by_membership_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp with time zone,
	"deleted_by_membership_id" uuid,
	"deleted_reason" text
);
--> statement-breakpoint
CREATE TABLE "organization_invitations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"email" text NOT NULL,
	"role" "organization_role" NOT NULL,
	"status" "invitation_status" DEFAULT 'PENDING' NOT NULL,
	"invited_by_membership_id" uuid,
	"accepted_by_user_id" uuid,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "organization_role" NOT NULL,
	"status" "membership_status" DEFAULT 'INVITED' NOT NULL,
	"joined_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"timezone" text DEFAULT 'America/Sao_Paulo' NOT NULL,
	"approval_contact_phone" text,
	"operations_label" text DEFAULT 'Transbordo' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by_membership_id" uuid
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"legal_name" text,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"full_name" text,
	"platform_role" "platform_role" DEFAULT 'NONE' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_created_by_membership_id_organization_memberships_id_fk" FOREIGN KEY ("created_by_membership_id") REFERENCES "public"."organization_memberships"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_updated_by_membership_id_organization_memberships_id_fk" FOREIGN KEY ("updated_by_membership_id") REFERENCES "public"."organization_memberships"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_revisions" ADD CONSTRAINT "event_revisions_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_revisions" ADD CONSTRAINT "event_revisions_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_revisions" ADD CONSTRAINT "event_revisions_edited_by_membership_id_organization_memberships_id_fk" FOREIGN KEY ("edited_by_membership_id") REFERENCES "public"."organization_memberships"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_membership_id_organization_memberships_id_fk" FOREIGN KEY ("created_by_membership_id") REFERENCES "public"."organization_memberships"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_updated_by_membership_id_organization_memberships_id_fk" FOREIGN KEY ("updated_by_membership_id") REFERENCES "public"."organization_memberships"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_deleted_by_membership_id_organization_memberships_id_fk" FOREIGN KEY ("deleted_by_membership_id") REFERENCES "public"."organization_memberships"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_invitations" ADD CONSTRAINT "organization_invitations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_invitations" ADD CONSTRAINT "organization_invitations_invited_by_membership_id_organization_memberships_id_fk" FOREIGN KEY ("invited_by_membership_id") REFERENCES "public"."organization_memberships"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_invitations" ADD CONSTRAINT "organization_invitations_accepted_by_user_id_user_profiles_id_fk" FOREIGN KEY ("accepted_by_user_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_memberships" ADD CONSTRAINT "organization_memberships_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_memberships" ADD CONSTRAINT "organization_memberships_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_settings" ADD CONSTRAINT "organization_settings_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_settings" ADD CONSTRAINT "organization_settings_updated_by_membership_id_organization_memberships_id_fk" FOREIGN KEY ("updated_by_membership_id") REFERENCES "public"."organization_memberships"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_id_auth_users_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "clients_org_name_idx" ON "clients" USING btree ("organization_id","name_upper");--> statement-breakpoint
CREATE INDEX "revisions_org_event_idx" ON "event_revisions" USING btree ("organization_id","event_id");--> statement-breakpoint
CREATE INDEX "events_shift_date_idx" ON "events" USING btree ("organization_id","shift_date");--> statement-breakpoint
CREATE INDEX "events_pump_shift_date_idx" ON "events" USING btree ("organization_id","pump","shift_date");--> statement-breakpoint
CREATE INDEX "events_client_shift_date_idx" ON "events" USING btree ("organization_id","client_id","shift_date");--> statement-breakpoint
CREATE INDEX "events_deleted_shift_date_idx" ON "events" USING btree ("organization_id","deleted","shift_date");--> statement-breakpoint
CREATE INDEX "events_created_by_idx" ON "events" USING btree ("organization_id","created_by_membership_id");--> statement-breakpoint
CREATE INDEX "invitations_org_email_idx" ON "organization_invitations" USING btree ("organization_id","email");--> statement-breakpoint
CREATE UNIQUE INDEX "memberships_org_user_idx" ON "organization_memberships" USING btree ("organization_id","user_id");--> statement-breakpoint
CREATE INDEX "memberships_org_role_idx" ON "organization_memberships" USING btree ("organization_id","role");--> statement-breakpoint
CREATE UNIQUE INDEX "organization_settings_org_idx" ON "organization_settings" USING btree ("organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX "organizations_slug_idx" ON "organizations" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "user_profiles_email_idx" ON "user_profiles" USING btree ("email");--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_no_overlap_active" EXCLUDE USING gist ("organization_id" WITH =, "pump" WITH =, tstzrange("start_at", "end_at", '[)') WITH &&) WHERE ("deleted" = false);
