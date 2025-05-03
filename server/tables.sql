CREATE TABLE "users" (
	"id" VARCHAR(50) NOT NULL,
	"name" VARCHAR(100) NOT NULL,
	"email" VARCHAR(150) NOT NULL,
	"password_hash" VARCHAR(255) NOT NULL,
	"auth_provider" SMALLINT NOT NULL DEFAULT 1,
	"deleted" BOOLEAN NOT NULL DEFAULT false,
	"created_at" TIMESTAMP DEFAULT now(),
	PRIMARY KEY("id")
);
CREATE UNIQUE INDEX "users_index_email_and_id"
ON "users" ("id", "email");

CREATE INDEX "users_index_by_name"
ON "users" ("name");

CREATE TABLE "expenses" (
	"id" VARCHAR(50) NOT NULL,
	"title" VARCHAR(100) NOT NULL,
	"description" VARCHAR(1024) NOT NULL,
	"owner" VARCHAR(50) NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"deleted" BOOLEAN NOT NULL DEFAULT false,
	PRIMARY KEY("id")
);
CREATE INDEX "expenses_index_id_and_owner"
ON "expenses" ("id", "owner");

CREATE TABLE "bills" (
	"id" VARCHAR(50) NOT NULL UNIQUE,
	"name" VARCHAR(255) NOT NULL,
	"description" VARCHAR(255) NOT NULL,
	"category" VARCHAR(100),
	"attachment_url" TEXT,
	"total_amount" DECIMAL NOT NULL,
	"paid_by" VARCHAR(50) NOT NULL,
	"expense_id" VARCHAR(50) NOT NULL,
	"status" SMALLINT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"currency" VARCHAR(10) DEFAULT 'GBP',
	"paid_date" TIMESTAMP NOT NULL DEFAULT now(),
	PRIMARY KEY("id")
);
CREATE INDEX "bills_index_by_expense_id_and_paid_by"
ON "bills" ("expense_id", "paid_by");

CREATE TABLE "expense_contributor" (
	"id" VARCHAR(50) NOT NULL UNIQUE,
	"user_id" VARCHAR(50),
	"name" VARCHAR(255),
	"expense_id" VARCHAR(50),
	"approval_status" SMALLINT DEFAULT 1,
	PRIMARY KEY("id")
);
CREATE INDEX "expense_contributor_index_user_id_and_expense_id"
ON "expense_contributor" ("user_id", "expense_id");

CREATE TABLE "bill_shared" (
	"id" VARCHAR(50) NOT NULL UNIQUE,
	"contributor_id" VARCHAR(50) NOT NULL,
	"bill_id" VARCHAR(50) NOT NULL,
	"total_amount" DECIMAL NOT NULL DEFAULT 0,
	"share_type" SMALLINT NOT NULL DEFAULT 1,
	"paid_status" SMALLINT NOT NULL DEFAULT 1,
	"paid_via" SMALLINT NOT NULL DEFAULT 1,
	"remarks" TEXT,
	PRIMARY KEY("id")
);
CREATE INDEX "bill_shared_index_id_contributor_id_and_bill_id"
ON "bill_shared" ("id", "contributor_id", "bill_id");

ALTER TABLE "expenses"
ADD FOREIGN KEY("owner") REFERENCES "users"("id")
ON UPDATE NO ACTION ON DELETE CASCADE;

ALTER TABLE "bills"
ADD FOREIGN KEY("expense_id") REFERENCES "expenses"("id")
ON UPDATE NO ACTION ON DELETE CASCADE;

ALTER TABLE "bills"
ADD FOREIGN KEY("paid_by") REFERENCES "expense_contributor"("id")
ON UPDATE NO ACTION ON DELETE CASCADE;

ALTER TABLE "bill_shared"
ADD FOREIGN KEY("contributor_id") REFERENCES "expense_contributor"("id")
ON UPDATE NO ACTION ON DELETE CASCADE;

ALTER TABLE "expense_contributor"
ADD FOREIGN KEY("expense_id") REFERENCES "expenses"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;