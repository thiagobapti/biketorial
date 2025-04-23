--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4 (Homebrew)

-- Started on 2025-04-22 23:00:10 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "biketorial-db";
--
-- TOC entry 3432 (class 1262 OID 16389)
-- Name: biketorial-db; Type: DATABASE; Schema: -; Owner: biketorial-db_owner
--

CREATE DATABASE "biketorial-db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = builtin LOCALE = 'C.UTF-8' BUILTIN_LOCALE = 'C.UTF-8';


ALTER DATABASE "biketorial-db" OWNER TO "biketorial-db_owner";

\encoding SQL_ASCII
\connect -reuse-previous=on "dbname='biketorial-db'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3434 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16493)
-- Name: builder_categories; Type: TABLE; Schema: public; Owner: biketorial-db_owner
--

CREATE TABLE public.builder_categories (
    "order" integer,
    id_category uuid NOT NULL,
    id_builder uuid NOT NULL
);


ALTER TABLE public.builder_categories OWNER TO "biketorial-db_owner";

--
-- TOC entry 221 (class 1259 OID 49152)
-- Name: builders; Type: TABLE; Schema: public; Owner: biketorial-db_owner
--

CREATE TABLE public.builders (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    label text NOT NULL
);


ALTER TABLE public.builders OWNER TO "biketorial-db_owner";

--
-- TOC entry 219 (class 1259 OID 24582)
-- Name: categories; Type: TABLE; Schema: public; Owner: biketorial-db_owner
--

CREATE TABLE public.categories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    label text NOT NULL,
    description text,
    id_category uuid
);


ALTER TABLE public.categories OWNER TO "biketorial-db_owner";

--
-- TOC entry 225 (class 1259 OID 98326)
-- Name: order_item_parts; Type: TABLE; Schema: public; Owner: biketorial-db_owner
--

CREATE TABLE public.order_item_parts (
    id_part uuid NOT NULL,
    id_order_item uuid NOT NULL,
    price numeric DEFAULT 0
);


ALTER TABLE public.order_item_parts OWNER TO "biketorial-db_owner";

--
-- TOC entry 226 (class 1259 OID 114692)
-- Name: order_items; Type: TABLE; Schema: public; Owner: biketorial-db_owner
--

CREATE TABLE public.order_items (
    id_order uuid NOT NULL,
    id_builder uuid,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    label text
);


ALTER TABLE public.order_items OWNER TO "biketorial-db_owner";

--
-- TOC entry 224 (class 1259 OID 98304)
-- Name: orders; Type: TABLE; Schema: public; Owner: biketorial-db_owner
--

CREATE TABLE public.orders (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    price numeric DEFAULT 0
);


ALTER TABLE public.orders OWNER TO "biketorial-db_owner";

--
-- TOC entry 223 (class 1259 OID 81920)
-- Name: part_restrictions; Type: TABLE; Schema: public; Owner: biketorial-db_owner
--

CREATE TABLE public.part_restrictions (
    id_part uuid NOT NULL,
    id_part_incompatible uuid NOT NULL,
    details text
);


ALTER TABLE public.part_restrictions OWNER TO "biketorial-db_owner";

--
-- TOC entry 220 (class 1259 OID 24592)
-- Name: parts; Type: TABLE; Schema: public; Owner: biketorial-db_owner
--

CREATE TABLE public.parts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    id_category uuid NOT NULL,
    label text NOT NULL,
    quantity_available integer,
    quantity_sold integer,
    price numeric DEFAULT 0,
    highlight boolean DEFAULT false NOT NULL,
    description text
);


ALTER TABLE public.parts OWNER TO "biketorial-db_owner";

--
-- TOC entry 222 (class 1259 OID 65541)
-- Name: pricing; Type: TABLE; Schema: public; Owner: biketorial-db_owner
--

CREATE TABLE public.pricing (
    id_part uuid NOT NULL,
    price numeric DEFAULT 0,
    id_related_part uuid NOT NULL
);


ALTER TABLE public.pricing OWNER TO "biketorial-db_owner";

--
-- TOC entry 3418 (class 0 OID 16493)
-- Dependencies: 218
-- Data for Name: builder_categories; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.builder_categories ("order", id_category, id_builder) FROM stdin;
1	2263b1b2-c10b-4436-87fd-1392caf5e329	b1ac25e7-90e1-463b-9efd-fe075da00ea3
4	658f923d-c7b5-4a81-8c89-af87520e399b	b1ac25e7-90e1-463b-9efd-fe075da00ea3
2	325ecb22-f5ce-47e0-bc26-301d245669c8	b1ac25e7-90e1-463b-9efd-fe075da00ea3
3	a644b9c0-2186-4426-ad56-d6902dc8a072	b1ac25e7-90e1-463b-9efd-fe075da00ea3
6	cd6c77f1-43b8-42f0-8d94-1ae37b95b797	b1ac25e7-90e1-463b-9efd-fe075da00ea3
5	fa156a7d-014b-4201-8a87-4b886c74e46a	b1ac25e7-90e1-463b-9efd-fe075da00ea3
\.


--
-- TOC entry 3421 (class 0 OID 49152)
-- Dependencies: 221
-- Data for Name: builders; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.builders (id, label) FROM stdin;
b1ac25e7-90e1-463b-9efd-fe075da00ea3	Custom Build
\.


--
-- TOC entry 3419 (class 0 OID 24582)
-- Dependencies: 219
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.categories (id, label, description, id_category) FROM stdin;
658f923d-c7b5-4a81-8c89-af87520e399b	Wheels	\N	\N
cd6c77f1-43b8-42f0-8d94-1ae37b95b797	Chain	\N	\N
a644b9c0-2186-4426-ad56-d6902dc8a072	Finish	\N	2263b1b2-c10b-4436-87fd-1392caf5e329
fa156a7d-014b-4201-8a87-4b886c74e46a	Rim Color	\N	658f923d-c7b5-4a81-8c89-af87520e399b
2263b1b2-c10b-4436-87fd-1392caf5e329	Frame	\N	\N
325ecb22-f5ce-47e0-bc26-301d245669c8	Frame Color	\N	2263b1b2-c10b-4436-87fd-1392caf5e329
\.


--
-- TOC entry 3425 (class 0 OID 98326)
-- Dependencies: 225
-- Data for Name: order_item_parts; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.order_item_parts (id_part, id_order_item, price) FROM stdin;
8dfc6957-dc91-4f0a-8a98-ca752185c1c2	4db6b7a7-0dba-4fe6-944e-e6c34a33c2f7	89
20df67d7-e86a-4738-9490-9429589f12e0	4db6b7a7-0dba-4fe6-944e-e6c34a33c2f7	0
fac8d0e7-b1b6-4757-ae42-f7bf49ae23e2	4db6b7a7-0dba-4fe6-944e-e6c34a33c2f7	50
b00217d2-4f33-4d61-b3fc-fd93e79478d0	4db6b7a7-0dba-4fe6-944e-e6c34a33c2f7	46
4d2be2fb-ff6a-4b06-8058-163d425a4efe	4db6b7a7-0dba-4fe6-944e-e6c34a33c2f7	0
51d0e8be-8e40-49fe-8c63-3f2fa74a4bb7	4db6b7a7-0dba-4fe6-944e-e6c34a33c2f7	25
c5a7cddd-470f-4098-8e53-9202706d33b1	6ec94f80-4158-4a7d-a516-19450ce3d402	65
20df67d7-e86a-4738-9490-9429589f12e0	6ec94f80-4158-4a7d-a516-19450ce3d402	0
fac8d0e7-b1b6-4757-ae42-f7bf49ae23e2	6ec94f80-4158-4a7d-a516-19450ce3d402	35
d2f0f16f-4eaf-43bf-aa53-64f0a65da971	6ec94f80-4158-4a7d-a516-19450ce3d402	52
591e19c0-adfb-4df1-a83a-7980097d6ee8	6ec94f80-4158-4a7d-a516-19450ce3d402	0
cb1efd19-8d4e-4fff-a69b-c69936fad548	6ec94f80-4158-4a7d-a516-19450ce3d402	14
d2f0f16f-4eaf-43bf-aa53-64f0a65da971	c03a5b6f-8ae6-4c69-9c87-c993025b457f	52
2dc230fb-ad65-4d19-b14c-7bdc2e288ea6	c03a5b6f-8ae6-4c69-9c87-c993025b457f	0
8dfc6957-dc91-4f0a-8a98-ca752185c1c2	ea126736-e1bc-4398-bbc0-28fd8466d354	130
20df67d7-e86a-4738-9490-9429589f12e0	ea126736-e1bc-4398-bbc0-28fd8466d354	0
84adc1e1-ff74-4b7c-ac28-049709724a99	ea126736-e1bc-4398-bbc0-28fd8466d354	30
b464fe24-ad1a-4af6-bfac-60113983b719	ea126736-e1bc-4398-bbc0-28fd8466d354	80
4d2be2fb-ff6a-4b06-8058-163d425a4efe	ea126736-e1bc-4398-bbc0-28fd8466d354	0
cb1efd19-8d4e-4fff-a69b-c69936fad548	ea126736-e1bc-4398-bbc0-28fd8466d354	43
d2f0f16f-4eaf-43bf-aa53-64f0a65da971	42ba686e-9d14-4f52-920f-443533730046	52
4d2be2fb-ff6a-4b06-8058-163d425a4efe	42ba686e-9d14-4f52-920f-443533730046	0
8dfc6957-dc91-4f0a-8a98-ca752185c1c2	2817a744-c7c2-4493-bd90-cb3f4228fbb3	130
20df67d7-e86a-4738-9490-9429589f12e0	2817a744-c7c2-4493-bd90-cb3f4228fbb3	0
fac8d0e7-b1b6-4757-ae42-f7bf49ae23e2	2817a744-c7c2-4493-bd90-cb3f4228fbb3	50
b464fe24-ad1a-4af6-bfac-60113983b719	2817a744-c7c2-4493-bd90-cb3f4228fbb3	80
4d2be2fb-ff6a-4b06-8058-163d425a4efe	2817a744-c7c2-4493-bd90-cb3f4228fbb3	0
51d0e8be-8e40-49fe-8c63-3f2fa74a4bb7	2817a744-c7c2-4493-bd90-cb3f4228fbb3	68
\.


--
-- TOC entry 3426 (class 0 OID 114692)
-- Dependencies: 226
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.order_items (id_order, id_builder, id, label) FROM stdin;
00709bba-673d-4736-badb-b0d1eb19d850	b1ac25e7-90e1-463b-9efd-fe075da00ea3	4db6b7a7-0dba-4fe6-944e-e6c34a33c2f7	\N
edddf187-8354-4284-b5ee-1d4cc911e927	b1ac25e7-90e1-463b-9efd-fe075da00ea3	6ec94f80-4158-4a7d-a516-19450ce3d402	Custom Build
12caa9c3-0ff1-488f-9957-2682827e6231	\N	c03a5b6f-8ae6-4c69-9c87-c993025b457f	Wheels
aa4a85b3-7ba3-4ef7-a814-f862bb3605ee	b1ac25e7-90e1-463b-9efd-fe075da00ea3	ea126736-e1bc-4398-bbc0-28fd8466d354	Custom Build
45b1dfc6-7658-4559-b5c6-fac9241df8c2	\N	42ba686e-9d14-4f52-920f-443533730046	Wheels
f4dd056e-0b3e-44f3-b321-f5c7d29c4d86	b1ac25e7-90e1-463b-9efd-fe075da00ea3	2817a744-c7c2-4493-bd90-cb3f4228fbb3	Custom Build
\.


--
-- TOC entry 3424 (class 0 OID 98304)
-- Dependencies: 224
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.orders (id, user_id, price) FROM stdin;
00709bba-673d-4736-badb-b0d1eb19d850	\N	210
b6831f23-6692-49cd-b63d-686d321a722f	\N	166
edddf187-8354-4284-b5ee-1d4cc911e927	\N	166
12caa9c3-0ff1-488f-9957-2682827e6231	\N	52
aa4a85b3-7ba3-4ef7-a814-f862bb3605ee	\N	283
45b1dfc6-7658-4559-b5c6-fac9241df8c2	\N	52
f4dd056e-0b3e-44f3-b321-f5c7d29c4d86	\N	328
\.


--
-- TOC entry 3423 (class 0 OID 81920)
-- Dependencies: 223
-- Data for Name: part_restrictions; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.part_restrictions (id_part, id_part_incompatible, details) FROM stdin;
c5a7cddd-470f-4098-8e53-9202706d33b1	b00217d2-4f33-4d61-b3fc-fd93e79478d0	\N
5056a5c9-d16d-4916-a55c-eb5c17082627	b00217d2-4f33-4d61-b3fc-fd93e79478d0	\N
4d2be2fb-ff6a-4b06-8058-163d425a4efe	d2f0f16f-4eaf-43bf-aa53-64f0a65da971	Manufacturer doesn't provide it
\.


--
-- TOC entry 3420 (class 0 OID 24592)
-- Dependencies: 220
-- Data for Name: parts; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.parts (id, id_category, label, quantity_available, quantity_sold, price, highlight, description) FROM stdin;
b464fe24-ad1a-4af6-bfac-60113983b719	658f923d-c7b5-4a81-8c89-af87520e399b	Road	4	0	80	f	Engineered for speed and agility, the road wheel is lightweight and aerodynamic. Its slim profile reduces drag, offering responsive handling on pavement and smooth surfaces—ideal for long-distance rides or competitive cycling.
d2f0f16f-4eaf-43bf-aa53-64f0a65da971	658f923d-c7b5-4a81-8c89-af87520e399b	Fat bike	42	12	52	t	Designed for extreme terrain, fat bike wheels feature oversized tires that provide floatation and stability on sand, snow, and loose surfaces. They're perfect for adventurers pushing the limits of where a bike can go.
20df67d7-e86a-4738-9490-9429589f12e0	325ecb22-f5ce-47e0-bc26-301d245669c8	Red	1	\N	0	f	\N
6b0e86b5-f216-4d05-899a-f5dc17abc840	325ecb22-f5ce-47e0-bc26-301d245669c8	Green	1	\N	0	f	\N
bd2ca11d-b0bc-4afb-9677-a87dac15b0e0	325ecb22-f5ce-47e0-bc26-301d245669c8	Blue	1	\N	0	f	\N
4d2be2fb-ff6a-4b06-8058-163d425a4efe	fa156a7d-014b-4201-8a87-4b886c74e46a	Red	1	\N	0	f	\N
2dc230fb-ad65-4d19-b14c-7bdc2e288ea6	fa156a7d-014b-4201-8a87-4b886c74e46a	Black	1	\N	0	f	\N
cb1efd19-8d4e-4fff-a69b-c69936fad548	cd6c77f1-43b8-42f0-8d94-1ae37b95b797	Single-speed	7	0	43	f	Simple, reliable, and low-maintenance—the single-speed chain is perfect for urban bikes and minimal setups. Built for durability and smooth engagement, it delivers consistent performance without the complexity of gears.
51d0e8be-8e40-49fe-8c63-3f2fa74a4bb7	cd6c77f1-43b8-42f0-8d94-1ae37b95b797	8-speed	8	0	68	f	Optimized for smooth shifting and efficiency across multiple gears, the 8-speed chain is ideal for riders who value flexibility. It's compatible with a wide range of drivetrains and built to handle diverse riding conditions.
c5a7cddd-470f-4098-8e53-9202706d33b1	2263b1b2-c10b-4436-87fd-1392caf5e329	Step-through	0	0	65	f	The step-through frame combines classic styling with everyday practicality. Its low top tube allows for easy mounting and dismounting, perfect for city riders, commuters, and anyone seeking a comfortable, upright ride.
5056a5c9-d16d-4916-a55c-eb5c17082627	2263b1b2-c10b-4436-87fd-1392caf5e329	Diamond	3	0	58	f	A timeless design trusted by cyclists worldwide, the diamond frame is known for its strength, rigidity, and efficiency. Whether you're cruising roads or tackling moderate trails, this geometry delivers balanced performance and durability.
b00217d2-4f33-4d61-b3fc-fd93e79478d0	658f923d-c7b5-4a81-8c89-af87520e399b	Mountain	5	8	46	t	Built tough for the demands of off-road riding, mountain wheels offer durability, grip, and shock absorption. Whether you're climbing rocky trails or descending steep slopes, they deliver reliable traction and control.
fac8d0e7-b1b6-4757-ae42-f7bf49ae23e2	a644b9c0-2186-4426-ad56-d6902dc8a072	Matte	1	0	35	f	\N
591e19c0-adfb-4df1-a83a-7980097d6ee8	fa156a7d-014b-4201-8a87-4b886c74e46a	Blue	1	\N	20	f	\N
84adc1e1-ff74-4b7c-ac28-049709724a99	a644b9c0-2186-4426-ad56-d6902dc8a072	Shiny	1	0	30	f	\N
8dfc6957-dc91-4f0a-8a98-ca752185c1c2	2263b1b2-c10b-4436-87fd-1392caf5e329	Full-suspension	1	0	130	f	Designed for serious trail riders, the full-suspension frame offers maximum comfort and control over rough terrain. With both front and rear suspension, it absorbs impacts efficiently, making it ideal for downhill and technical routes.
\.


--
-- TOC entry 3422 (class 0 OID 65541)
-- Dependencies: 222
-- Data for Name: pricing; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.pricing (id_part, price, id_related_part) FROM stdin;
fac8d0e7-b1b6-4757-ae42-f7bf49ae23e2	50	8dfc6957-dc91-4f0a-8a98-ca752185c1c2
\.


--
-- TOC entry 3240 (class 2606 OID 98318)
-- Name: builder_categories builder_features_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builder_categories
    ADD CONSTRAINT builder_features_pk PRIMARY KEY (id_category, id_builder);


--
-- TOC entry 3248 (class 2606 OID 49159)
-- Name: builders builders_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builders
    ADD CONSTRAINT builders_pk PRIMARY KEY (id);


--
-- TOC entry 3250 (class 2606 OID 49161)
-- Name: builders builders_unique; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builders
    ADD CONSTRAINT builders_unique UNIQUE (label);


--
-- TOC entry 3256 (class 2606 OID 98311)
-- Name: orders carts_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT carts_pk PRIMARY KEY (id);


--
-- TOC entry 3242 (class 2606 OID 24589)
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (id);


--
-- TOC entry 3244 (class 2606 OID 24591)
-- Name: categories categories_unique; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_unique UNIQUE (label);


--
-- TOC entry 3258 (class 2606 OID 114717)
-- Name: order_item_parts order_item_parts_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.order_item_parts
    ADD CONSTRAINT order_item_parts_pk PRIMARY KEY (id_part, id_order_item);


--
-- TOC entry 3260 (class 2606 OID 114710)
-- Name: order_items order_items_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pk PRIMARY KEY (id);


--
-- TOC entry 3254 (class 2606 OID 81926)
-- Name: part_restrictions part_restrictions_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.part_restrictions
    ADD CONSTRAINT part_restrictions_pk PRIMARY KEY (id_part, id_part_incompatible);


--
-- TOC entry 3246 (class 2606 OID 24599)
-- Name: parts parts_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.parts
    ADD CONSTRAINT parts_pk PRIMARY KEY (id);


--
-- TOC entry 3252 (class 2606 OID 98325)
-- Name: pricing pricing_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.pricing
    ADD CONSTRAINT pricing_pk PRIMARY KEY (id_part, id_related_part);


--
-- TOC entry 3261 (class 2606 OID 49162)
-- Name: builder_categories bike_builder_features_builders_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builder_categories
    ADD CONSTRAINT bike_builder_features_builders_fk FOREIGN KEY (id_builder) REFERENCES public.builders(id);


--
-- TOC entry 3262 (class 2606 OID 40967)
-- Name: builder_categories bike_builder_features_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builder_categories
    ADD CONSTRAINT bike_builder_features_categories_fk FOREIGN KEY (id_category) REFERENCES public.categories(id);


--
-- TOC entry 3269 (class 2606 OID 98334)
-- Name: order_item_parts cart_parts_parts_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.order_item_parts
    ADD CONSTRAINT cart_parts_parts_fk FOREIGN KEY (id_part) REFERENCES public.parts(id);


--
-- TOC entry 3263 (class 2606 OID 65536)
-- Name: categories categories_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_categories_fk FOREIGN KEY (id_category) REFERENCES public.categories(id);


--
-- TOC entry 3271 (class 2606 OID 114695)
-- Name: order_items order_items_builders_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_builders_fk FOREIGN KEY (id_builder) REFERENCES public.builders(id);


--
-- TOC entry 3272 (class 2606 OID 114700)
-- Name: order_items order_items_orders_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_orders_fk FOREIGN KEY (id_order) REFERENCES public.orders(id);


--
-- TOC entry 3270 (class 2606 OID 114711)
-- Name: order_item_parts order_parts_order_items_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.order_item_parts
    ADD CONSTRAINT order_parts_order_items_fk FOREIGN KEY (id_order_item) REFERENCES public.order_items(id);


--
-- TOC entry 3267 (class 2606 OID 90112)
-- Name: part_restrictions part_restrictions_parts_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.part_restrictions
    ADD CONSTRAINT part_restrictions_parts_fk FOREIGN KEY (id_part) REFERENCES public.parts(id);


--
-- TOC entry 3268 (class 2606 OID 90117)
-- Name: part_restrictions part_restrictions_parts_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.part_restrictions
    ADD CONSTRAINT part_restrictions_parts_fk_1 FOREIGN KEY (id_part_incompatible) REFERENCES public.parts(id);


--
-- TOC entry 3264 (class 2606 OID 24600)
-- Name: parts parts_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.parts
    ADD CONSTRAINT parts_categories_fk FOREIGN KEY (id_category) REFERENCES public.categories(id);


--
-- TOC entry 3265 (class 2606 OID 65551)
-- Name: pricing pricing_parts_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.pricing
    ADD CONSTRAINT pricing_parts_fk FOREIGN KEY (id_part) REFERENCES public.parts(id);


--
-- TOC entry 3266 (class 2606 OID 73728)
-- Name: pricing pricing_related_parts_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.pricing
    ADD CONSTRAINT pricing_related_parts_fk FOREIGN KEY (id_related_part) REFERENCES public.parts(id);


--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 3432
-- Name: DATABASE "biketorial-db"; Type: ACL; Schema: -; Owner: biketorial-db_owner
--

GRANT ALL ON DATABASE "biketorial-db" TO neon_superuser;


--
-- TOC entry 2087 (class 826 OID 16392)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- TOC entry 2086 (class 826 OID 16391)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


-- Completed on 2025-04-22 23:00:24 -03

--
-- PostgreSQL database dump complete
--

