-- Author: Heiler Nova

drop schema public cascade;
create schema public;
create extension pgcrypto;
create extension unaccent;


create domain cellphone as varchar check (value ~* '^\+\d+ \d{3} \d{3} \d{4}$');
create domain email as varchar(100) check (value ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------
-- Countries
--------------------------------------------------------------------------------------------------------------------------
create table countries
(
    "id" uuid primary key default gen_random_uuid(),
    "name" varchar(80),
    "code_alfa_2" char(2) not null unique,
    "code_alfa_3" char(3) not null unique,
    "code_numeric" char(3),
    "phone_code" varchar(5),
    "demonym" varchar(80),
    "nationality" varchar(80),
    "territorial_division" varchar(50) -- Departamentos, estados, Provincias
);

create table countries_regions
(
    "id" uuid primary key default gen_random_uuid(),
    "country_id" uuid not null,
    "name" varchar(50) not null
);

create table countries_territories
(
    "id" uuid primary key default gen_random_uuid(),
    "country_id" uuid not null,
    "region_id" uuid,
    "code" varchar(5) not null,
    "name" varchar(80)
);

create table countries_cities
(
    "id" uuid primary key default gen_random_uuid(),
    "territory_id" uuid not null,
    "code" varchar(8),
    "name" varchar(80)
);

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------
-- Users
--------------------------------------------------------------------------------------------------------------------------
create type sex as enum('M', 'F');
create type user_role as enum('admin', 'user');
create type user_state as enum('enable', 'disable', 'banned');

create table users
(
    "id" uuid primary key default gen_random_uuid(),
    "create_at" timestamp not null default now(),
    "update_at" timestamp not null default now(),
    "status" user_state not null default 'enable',
    "role" user_role not null default 'user',
    "is_coach" boolean not null default false,
    "username" varchar(20) not null unique,
    "name" varchar(20) not null,
    "last_name" varchar(20) not null,
    "alias" varchar(40),
    "sex" sex not null,
    "email" email not null unique,
    "birthdate" date not null,
    "cellphone" cellphone,
    "tall" smallint, --> Height in centimeters
    "weight" smallint, --> Weight in kilogramos
    "country" char(2) not null,
    "category" smallint default 0,
    "verified" uuid,
    "password" text not null, --> password hash
    "permissions" text[] not null default array[]::text[],
    "settings" json not null default '{}'::json
);

create table users_log
(
    "id" uuid primary key default gen_random_uuid(),
    "create_at" timestamp not null default now(),
    "user_id" uuid not null,
    "action" varchar(20) not null,
    "status" varchar(20) not null,
    "detail" varchar(80) not null
);

create table users_records_weight
(
    "id" uuid primary key default gen_random_uuid(),
    "create_at" timestamp not null default now(),
    "user_id" uuid not null,
    "weight_in_kilos" smallint
);

create table users_records_rm
(
    "id" uuid primary key default gen_random_uuid(),
    "create_at" timestamp not null default now(),
    "user_id" uuid not null,
    "workout_id" uuid not null,
    "weight_in_kilos" smallint not null,
    "weight_in_pounds" smallint not null
);

create table users_records_pr
(
    "id" uuid primary key default gen_random_uuid(),
    "create_at" timestamp not null default now(),
    "user_id" uuid not null,
    "workout_id" uuid not null,
    "weight_in_kilos" smallint default null,
    "weight_in_pounds" smallint default null,
    "reps" smallint not null
);

-- Triggers
-- Record the weight in the users_records_weight table every time the weight is updated
create function user_insert_or_update_after() returns trigger language plpgsql as $$
begin
    if new.weight is not null then
        if (OLD.weight IS DISTINCT FROM NEW.weight) then
            insert into users_records_weight("user_id", "weight_in_kilos") values(new.id, new.weight);
        end if;
        return new;
    end if;
    return old;
end;$$;

create trigger insert_or_update after insert or update on users
for each row execute function user_insert_or_update_after();

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------
-- Workouts
--------------------------------------------------------------------------------------------------------------------------
create table workouts
(
    "id" uuid primary key default gen_random_uuid(),
    "create_at" timestamp not null default now(),
    "update_at" timestamp not null default now(),
    "name_in_english" varchar(50) not null,
    "name_in_spanish" varchar(50) default null,
    "abbreviation" varchar(6) default null,
    "slug" varchar(50) not null,
    "rm" boolean not null default false,
    "pr" boolean not null default false,
    "youtube" text default null,
    "description" text
);

create table workouts_log
(
    "id" uuid primary key default gen_random_uuid(),
    "create_at" timestamp not null default now(),
    "user_id" uuid not null,
    "workout_id" uuid not null,
    "action" varchar(20),
    "detail" varchar(80),
    "before" json not null,
    "after" json not null
);

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------
-- CrossFit gyms
--------------------------------------------------------------------------------------------------------------------------
create table gyms
(
    "id" uuid primary key default gen_random_uuid(),
    "create_at" timestamp not null default now(),
    "update_at" timestamp not null default now(),
    "nit" varchar(15) not null,
    "name" varchar(80) not null unique,
    "slug" varchar(80) not null,
    "city" uuid not null,
    "address" varchar(100) not null,
    "coordinates_google_maps" text,
    "email" text,
    "cellphone" cellphone not null,
    "social_networks" json not null default '{}'::json,
    "attention_schedule" json[] not null default array[]::json[],
    "tags" text[] default array[]::text[],
	"description" text
);

create table gyms_collaborators
(
    "gym_id" uuid primary key default gen_random_uuid(),
    "user_id" uuid not null,
    "permissions" text[] not null default array[]::text[]
);


-- create type gyms_balances_transaction_type as enum('membership', 'expense', 'cost', 'compras', 'sale');

-- create table gyms_balances_transactions
-- (
--     "id" uuid primary key default gen_random_uuid(),
--     "create_at" timestamp not null default now(),
--     "user_id" uuid not null,
--     "type" gyms_balances_transaction_type not null,
--     "description" varchar(80) not null,
--     "amount" numeric(15, 2) not null,
--     "balance" numeric(15, 2) not null
-- );


create table gyms_customers
(
    "id" uuid primary key default gen_random_uuid(),
    "create_at" timestamp not null default now(),
    "gym_id" uuid not null,
    "user_id" uuid, --> User associated with the customer
    "alias" varchar(20),
    "active" boolean not null default false,
    "membership_exp" date,
    "balance" numeric(15, 2) not null default 0
);

-- create table gyms_customers_memberships
-- (
--     "id" uuid primary key default gen_random_uuid(),
--     "create_at" timestamp not null default now(),
--     "user_id" uuid not null,
--     "customer_id" uuid not null,
--     "price" numeric(15, 2) not null,
--     "exp" date
-- );

-- create table gyms_customers_transactions
-- (
--     "id" uuid primary key default gen_random_uuid(),
--     "create_at" timestamp not null default now(),
--     "customer_id" uuid not null,
--     "user_id" uuid not null,
--     "detail" varchar(80) not null,
--     "amount" numeric(15, 2) not null,
--     "balance" numeric(15, 2) not null
-- );


--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------
-- Views
--------------------------------------------------------------------------------------------------------------------------


-- Record RM's
create view vi_users_records_rms as
select
    t1.id as record_id, -- Id del registro
    t1.create_at,
    t1.user_id,
    t1.workout_id,
    t2.name_in_english,
    t2.name_in_spanish,
    t2.slug,
    t2.abbreviation,
    t1.weight_in_kilos,
    t1.weight_in_pounds
from users_records_rm t1
    join workouts t2 on t2.id = t1.workout_id
order by t1.create_at;

-- RM's for workouts
create view vi_users_rms as 
select
    distinct on (t1.workout_id, t1.user_id)
    t1.record_id,
    t1.workout_id,
    t1.create_at,
    t1.user_id,
    t2.name_in_english,
    t2.name_in_spanish,
    t2.slug,
    t2.abbreviation,
    t1.weight_in_kilos,
    t1.weight_in_pounds
from vi_users_records_rms t1
join workouts t2 on t2.id = t1.workout_id
order by t1.workout_id, t1.user_id, t1.create_at desc;

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------
-- WOD
--------------------------------------------------------------------------------------------------------------------------

create type wod_type_rating as enum('asc', 'desc');

create table wods
(
    "id" uuid primary key default gen_random_uuid(),
    "create_at" timestamp not null default now(),
    "user_id" uuid not null,
    "gym_id" uuid,
    "data" json not null,
    "type_rating" wod_type_rating not null
);

create table wods_comments
(
    "id" uuid primary key default gen_random_uuid(),
    "create_at" timestamp not null default now(),
    "user_id" uuid not null,
    "wod_id" uuid not null,
    "comment" varchar(500) not null
);

create table wods_results
(
    "id" uuid primary key default gen_random_uuid(),
    "create_at" timestamp not null default now(),
    "wod_id" uuid not null,
    "user_id" uuid not null,
    "result" json not null,
    "score" smallint,
    "verified" uuid
);

create table wods_results_wods_results
(
    "id" uuid primary key default gen_random_uuid(),
    "create_at" timestamp not null default now(),
    "wods_results_id" uuid not null,
    "user_id" uuid not null
);



--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------
-- Foreign keys
--------------------------------------------------------------------------------------------------------------------------

alter table countries_regions
    add constraint fk_countries_regions__countries
        foreign key (country_id)
        references countries(id);

alter table countries_territories
    add constraint fk_countries_territories__countries_sections
        foreign key (country_id)
        references countries(id);

alter table countries_cities
    add constraint fk_countries_cities__countries
        foreign key (territory_id)
        references countries_territories(id);

alter  table users_log
    add constraint fk_users_log__users
        foreign key (user_id)
        references users(id)
        on delete cascade;

alter  table users_records_weight
    add constraint fk_users_records_weight__users
        foreign key (user_id)
        references users(id)
        on delete cascade;

alter table users_records_rm
    add constraint fk_users_records_rm__users
        foreign key (user_id)
        references users(id)
        on delete cascade,
    add constraint users_records_rm__workouts
        foreign key (workout_id)
        references workouts(id);

alter table users_records_pr
    add constraint fk_users_records_pr__users
        foreign key (user_id)
        references users(id)
        on delete cascade,
    add constraint users_records_rm__workouts
        foreign key (workout_id)
        references workouts(id);

alter table workouts_log
    add constraint fk_workouts_log__users
        foreign key (user_id)
        references users(id)
        on delete cascade;

alter table gyms
    add constraint fk_gyms__users
        foreign key (user_id)
        references users(id)
        on delete cascade;

alter table gyms_collaborators
    add constraint fk_gyms_collaborators__gyms
        foreign key (gym_id)
        references gyms(id)
        on delete cascade,
    add constraint fk_gyms_collaborators__users
        foreign key (user_id)
        references users(id)
        on delete cascade;

alter table gyms_customers
    add constraint fk_gyms_customers__gyms
        foreign key (gym_id)
        references gyms(id),
    add constraint fk_gyms_customers__users
        foreign key (user_id)
        references users(id);

alter table wods_comments
    add constraint fk_wods_comments__wods
        foreign key (wod_id)
        references wods(id)
        on delete cascade,
    add constraint fk_wods_comments__users_id
        foreign key (user_id)
        references users(id);

alter table wods_results
    add constraint fk_wods_results__wods_id
        foreign key (wod_id)
        references wods(id)
        on delete cascade,
    add constraint fk_wods_results__users
        foreign key (user_id)
        references users(id);

alter table wods_results_wods_results
    add constraint fk_wods_results_wods_results__wods_results
        foreign key (wods_results_id)
        references wods_results_wods_results(id)
        on delete cascade,
    add constraint fk_wods_results_wods_results__users
        foreign key (user_id)
        references users(id);