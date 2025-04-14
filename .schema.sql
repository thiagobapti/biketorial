--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4 (Homebrew)

-- Started on 2025-04-14 13:38:58 -03

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
-- TOC entry 3408 (class 1262 OID 16389)
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
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16493)
-- Name: builder_features; Type: TABLE; Schema: public; Owner: biketorial-db_owner
--

CREATE TABLE public.builder_features (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "order" integer,
    id_category uuid,
    id_builder uuid
);


ALTER TABLE public.builder_features OWNER TO "biketorial-db_owner";

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
    base_price numeric DEFAULT 0
);


ALTER TABLE public.parts OWNER TO "biketorial-db_owner";

--
-- TOC entry 222 (class 1259 OID 65541)
-- Name: pricing; Type: TABLE; Schema: public; Owner: biketorial-db_owner
--

CREATE TABLE public.pricing (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    id_part uuid,
    price numeric DEFAULT 0,
    base_price numeric DEFAULT 0,
    id_related_part uuid
);


ALTER TABLE public.pricing OWNER TO "biketorial-db_owner";

--
-- TOC entry 3397 (class 0 OID 16493)
-- Dependencies: 218
-- Data for Name: builder_features; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.builder_features (id, "order", id_category, id_builder) FROM stdin;
eb81cb8f-a678-4028-a030-fa31731eeddf	1	2263b1b2-c10b-4436-87fd-1392caf5e329	b1ac25e7-90e1-463b-9efd-fe075da00ea3
2be1294b-d3fe-4753-9c99-c62af6f123b1	4	658f923d-c7b5-4a81-8c89-af87520e399b	b1ac25e7-90e1-463b-9efd-fe075da00ea3
d9939957-a688-4905-a495-146e13e8ed2a	2	325ecb22-f5ce-47e0-bc26-301d245669c8	b1ac25e7-90e1-463b-9efd-fe075da00ea3
bf295267-8a6c-470b-a6db-cb1e780750cf	3	a644b9c0-2186-4426-ad56-d6902dc8a072	b1ac25e7-90e1-463b-9efd-fe075da00ea3
5030467a-536f-4e2e-84d1-5fb0e0e58180	6	cd6c77f1-43b8-42f0-8d94-1ae37b95b797	b1ac25e7-90e1-463b-9efd-fe075da00ea3
f4eb09e3-9fcf-4005-a390-084114965353	5	fa156a7d-014b-4201-8a87-4b886c74e46a	b1ac25e7-90e1-463b-9efd-fe075da00ea3
\.


--
-- TOC entry 3400 (class 0 OID 49152)
-- Dependencies: 221
-- Data for Name: builders; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.builders (id, label) FROM stdin;
b1ac25e7-90e1-463b-9efd-fe075da00ea3	Bicycle
\.


--
-- TOC entry 3398 (class 0 OID 24582)
-- Dependencies: 219
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.categories (id, label, description, id_category) FROM stdin;
2263b1b2-c10b-4436-87fd-1392caf5e329	Frame	\N	\N
658f923d-c7b5-4a81-8c89-af87520e399b	Wheels	\N	\N
cd6c77f1-43b8-42f0-8d94-1ae37b95b797	Chain	\N	\N
325ecb22-f5ce-47e0-bc26-301d245669c8	Color	\N	2263b1b2-c10b-4436-87fd-1392caf5e329
a644b9c0-2186-4426-ad56-d6902dc8a072	Finish	\N	2263b1b2-c10b-4436-87fd-1392caf5e329
fa156a7d-014b-4201-8a87-4b886c74e46a	Rim Color	\N	658f923d-c7b5-4a81-8c89-af87520e399b
\.


--
-- TOC entry 3402 (class 0 OID 81920)
-- Dependencies: 223
-- Data for Name: part_restrictions; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.part_restrictions (id_part, id_part_incompatible, details) FROM stdin;
4d2be2fb-ff6a-4b06-8058-163d425a4efe	d2f0f16f-4eaf-43bf-aa53-64f0a65da971	\N
c5a7cddd-470f-4098-8e53-9202706d33b1	b00217d2-4f33-4d61-b3fc-fd93e79478d0	\N
5056a5c9-d16d-4916-a55c-eb5c17082627	b00217d2-4f33-4d61-b3fc-fd93e79478d0	\N
\.


--
-- TOC entry 3399 (class 0 OID 24592)
-- Dependencies: 220
-- Data for Name: parts; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.parts (id, id_category, label, quantity_available, quantity_sold, price, base_price) FROM stdin;
8dfc6957-dc91-4f0a-8a98-ca752185c1c2	2263b1b2-c10b-4436-87fd-1392caf5e329	Full-suspension	1	0	1	0
c5a7cddd-470f-4098-8e53-9202706d33b1	2263b1b2-c10b-4436-87fd-1392caf5e329	Step-through	3	0	2	0
b464fe24-ad1a-4af6-bfac-60113983b719	658f923d-c7b5-4a81-8c89-af87520e399b	Road wheels	4	0	3	0
cb1efd19-8d4e-4fff-a69b-c69936fad548	cd6c77f1-43b8-42f0-8d94-1ae37b95b797	Single-speed chain	7	0	4	0
51d0e8be-8e40-49fe-8c63-3f2fa74a4bb7	cd6c77f1-43b8-42f0-8d94-1ae37b95b797	8-speed chain	8	0	5	0
5056a5c9-d16d-4916-a55c-eb5c17082627	2263b1b2-c10b-4436-87fd-1392caf5e329	Diamond	0	0	6	0
b00217d2-4f33-4d61-b3fc-fd93e79478d0	658f923d-c7b5-4a81-8c89-af87520e399b	Mountain wheels	5	8	7	0
d2f0f16f-4eaf-43bf-aa53-64f0a65da971	658f923d-c7b5-4a81-8c89-af87520e399b	Fat bike wheels	6	12	8	0
fac8d0e7-b1b6-4757-ae42-f7bf49ae23e2	a644b9c0-2186-4426-ad56-d6902dc8a072	Matte	0	0	9	0
84adc1e1-ff74-4b7c-ac28-049709724a99	a644b9c0-2186-4426-ad56-d6902dc8a072	Shiny	0	0	10	0
20df67d7-e86a-4738-9490-9429589f12e0	325ecb22-f5ce-47e0-bc26-301d245669c8	Red	\N	\N	11	0
6b0e86b5-f216-4d05-899a-f5dc17abc840	325ecb22-f5ce-47e0-bc26-301d245669c8	Green	\N	\N	12	0
bd2ca11d-b0bc-4afb-9677-a87dac15b0e0	325ecb22-f5ce-47e0-bc26-301d245669c8	Blue	\N	\N	13	0
4d2be2fb-ff6a-4b06-8058-163d425a4efe	fa156a7d-014b-4201-8a87-4b886c74e46a	Red	\N	\N	14	0
2dc230fb-ad65-4d19-b14c-7bdc2e288ea6	fa156a7d-014b-4201-8a87-4b886c74e46a	Black	\N	\N	15	0
591e19c0-adfb-4df1-a83a-7980097d6ee8	fa156a7d-014b-4201-8a87-4b886c74e46a	Blue	\N	\N	16	0
\.


--
-- TOC entry 3401 (class 0 OID 65541)
-- Dependencies: 222
-- Data for Name: pricing; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.pricing (id, id_part, price, base_price, id_related_part) FROM stdin;
0c11383f-2c9d-497c-8d0a-301266c8945c	fac8d0e7-b1b6-4757-ae42-f7bf49ae23e2	50	0	8dfc6957-dc91-4f0a-8a98-ca752185c1c2
\.


--
-- TOC entry 3227 (class 2606 OID 16500)
-- Name: builder_features bike_builder_features_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builder_features
    ADD CONSTRAINT bike_builder_features_pk PRIMARY KEY (id);


--
-- TOC entry 3229 (class 2606 OID 40966)
-- Name: builder_features bike_builder_features_unique; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builder_features
    ADD CONSTRAINT bike_builder_features_unique UNIQUE (id_category);


--
-- TOC entry 3237 (class 2606 OID 49159)
-- Name: builders builders_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builders
    ADD CONSTRAINT builders_pk PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 49161)
-- Name: builders builders_unique; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builders
    ADD CONSTRAINT builders_unique UNIQUE (label);


--
-- TOC entry 3231 (class 2606 OID 24589)
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (id);


--
-- TOC entry 3233 (class 2606 OID 24591)
-- Name: categories categories_unique; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_unique UNIQUE (label);


--
-- TOC entry 3243 (class 2606 OID 81926)
-- Name: part_restrictions part_restrictions_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.part_restrictions
    ADD CONSTRAINT part_restrictions_pk PRIMARY KEY (id_part, id_part_incompatible);


--
-- TOC entry 3235 (class 2606 OID 24599)
-- Name: parts parts_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.parts
    ADD CONSTRAINT parts_pk PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 65550)
-- Name: pricing pricing_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.pricing
    ADD CONSTRAINT pricing_pk PRIMARY KEY (id);


--
-- TOC entry 3244 (class 2606 OID 49162)
-- Name: builder_features bike_builder_features_builders_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builder_features
    ADD CONSTRAINT bike_builder_features_builders_fk FOREIGN KEY (id_builder) REFERENCES public.builders(id);


--
-- TOC entry 3245 (class 2606 OID 40967)
-- Name: builder_features bike_builder_features_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builder_features
    ADD CONSTRAINT bike_builder_features_categories_fk FOREIGN KEY (id_category) REFERENCES public.categories(id);


--
-- TOC entry 3246 (class 2606 OID 65536)
-- Name: categories categories_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_categories_fk FOREIGN KEY (id_category) REFERENCES public.categories(id);


--
-- TOC entry 3250 (class 2606 OID 90112)
-- Name: part_restrictions part_restrictions_parts_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.part_restrictions
    ADD CONSTRAINT part_restrictions_parts_fk FOREIGN KEY (id_part) REFERENCES public.parts(id);


--
-- TOC entry 3251 (class 2606 OID 90117)
-- Name: part_restrictions part_restrictions_parts_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.part_restrictions
    ADD CONSTRAINT part_restrictions_parts_fk_1 FOREIGN KEY (id_part_incompatible) REFERENCES public.parts(id);


--
-- TOC entry 3247 (class 2606 OID 24600)
-- Name: parts parts_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.parts
    ADD CONSTRAINT parts_categories_fk FOREIGN KEY (id_category) REFERENCES public.categories(id);


--
-- TOC entry 3248 (class 2606 OID 65551)
-- Name: pricing pricing_parts_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.pricing
    ADD CONSTRAINT pricing_parts_fk FOREIGN KEY (id_part) REFERENCES public.parts(id);


--
-- TOC entry 3249 (class 2606 OID 73728)
-- Name: pricing pricing_related_parts_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.pricing
    ADD CONSTRAINT pricing_related_parts_fk FOREIGN KEY (id_related_part) REFERENCES public.parts(id);


--
-- TOC entry 3409 (class 0 OID 0)
-- Dependencies: 3408
-- Name: DATABASE "biketorial-db"; Type: ACL; Schema: -; Owner: biketorial-db_owner
--

GRANT ALL ON DATABASE "biketorial-db" TO neon_superuser;


--
-- TOC entry 2075 (class 826 OID 16392)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- TOC entry 2074 (class 826 OID 16391)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


-- Completed on 2025-04-14 13:39:13 -03

--
-- PostgreSQL database dump complete
--

