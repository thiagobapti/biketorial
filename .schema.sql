--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4 (Homebrew)

-- Started on 2025-04-10 10:17:17 -03

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
-- TOC entry 3393 (class 1262 OID 16389)
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
-- TOC entry 3395 (class 0 OID 0)
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
-- TOC entry 222 (class 1259 OID 49152)
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
    description text
);


ALTER TABLE public.categories OWNER TO "biketorial-db_owner";

--
-- TOC entry 221 (class 1259 OID 32768)
-- Name: modifiers; Type: TABLE; Schema: public; Owner: biketorial-db_owner
--

CREATE TABLE public.modifiers (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    label text NOT NULL,
    id_category uuid
);


ALTER TABLE public.modifiers OWNER TO "biketorial-db_owner";

--
-- TOC entry 220 (class 1259 OID 24592)
-- Name: parts; Type: TABLE; Schema: public; Owner: biketorial-db_owner
--

CREATE TABLE public.parts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    id_category uuid NOT NULL,
    label text NOT NULL,
    discount_price numeric,
    regular_price numeric
);


ALTER TABLE public.parts OWNER TO "biketorial-db_owner";

--
-- TOC entry 3383 (class 0 OID 16493)
-- Dependencies: 218
-- Data for Name: builder_features; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.builder_features (id, "order", id_category, id_builder) FROM stdin;
eb81cb8f-a678-4028-a030-fa31731eeddf	1	2263b1b2-c10b-4436-87fd-1392caf5e329	b1ac25e7-90e1-463b-9efd-fe075da00ea3
2be1294b-d3fe-4753-9c99-c62af6f123b1	2	658f923d-c7b5-4a81-8c89-af87520e399b	b1ac25e7-90e1-463b-9efd-fe075da00ea3
5030467a-536f-4e2e-84d1-5fb0e0e58180	3	cd6c77f1-43b8-42f0-8d94-1ae37b95b797	b1ac25e7-90e1-463b-9efd-fe075da00ea3
\.


--
-- TOC entry 3387 (class 0 OID 49152)
-- Dependencies: 222
-- Data for Name: builders; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.builders (id, label) FROM stdin;
b1ac25e7-90e1-463b-9efd-fe075da00ea3	Bicycle
\.


--
-- TOC entry 3384 (class 0 OID 24582)
-- Dependencies: 219
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.categories (id, label, description) FROM stdin;
2263b1b2-c10b-4436-87fd-1392caf5e329	Frame	\N
658f923d-c7b5-4a81-8c89-af87520e399b	Wheels	\N
cd6c77f1-43b8-42f0-8d94-1ae37b95b797	Chain	\N
\.


--
-- TOC entry 3386 (class 0 OID 32768)
-- Dependencies: 221
-- Data for Name: modifiers; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.modifiers (id, label, id_category) FROM stdin;
d88a1ff8-2eb1-4930-9068-b3579034cf5d	Finish	2263b1b2-c10b-4436-87fd-1392caf5e329
13e2f472-8f99-446d-a6f2-ef82a3949daa	Rim color	658f923d-c7b5-4a81-8c89-af87520e399b
fab4c7c9-1474-4f78-8ccd-8ca74ee0c62c	Color	2263b1b2-c10b-4436-87fd-1392caf5e329
\.


--
-- TOC entry 3385 (class 0 OID 24592)
-- Dependencies: 220
-- Data for Name: parts; Type: TABLE DATA; Schema: public; Owner: biketorial-db_owner
--

COPY public.parts (id, id_category, label, discount_price, regular_price) FROM stdin;
8dfc6957-dc91-4f0a-8a98-ca752185c1c2	2263b1b2-c10b-4436-87fd-1392caf5e329	Full-suspension	1	2
5056a5c9-d16d-4916-a55c-eb5c17082627	2263b1b2-c10b-4436-87fd-1392caf5e329	Diamond	2	3
c5a7cddd-470f-4098-8e53-9202706d33b1	2263b1b2-c10b-4436-87fd-1392caf5e329	Step-through	4	5
b464fe24-ad1a-4af6-bfac-60113983b719	658f923d-c7b5-4a81-8c89-af87520e399b	Road wheels	6	7
b00217d2-4f33-4d61-b3fc-fd93e79478d0	658f923d-c7b5-4a81-8c89-af87520e399b	Mountain wheels	8	9
d2f0f16f-4eaf-43bf-aa53-64f0a65da971	658f923d-c7b5-4a81-8c89-af87520e399b	Fat bike wheels	10.5	11.5
cb1efd19-8d4e-4fff-a69b-c69936fad548	cd6c77f1-43b8-42f0-8d94-1ae37b95b797	Single-speed chain	12	13
51d0e8be-8e40-49fe-8c63-3f2fa74a4bb7	cd6c77f1-43b8-42f0-8d94-1ae37b95b797	8-speed chain	14	15
\.


--
-- TOC entry 3219 (class 2606 OID 16500)
-- Name: builder_features bike_builder_features_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builder_features
    ADD CONSTRAINT bike_builder_features_pk PRIMARY KEY (id);


--
-- TOC entry 3221 (class 2606 OID 40966)
-- Name: builder_features bike_builder_features_unique; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builder_features
    ADD CONSTRAINT bike_builder_features_unique UNIQUE (id_category);


--
-- TOC entry 3231 (class 2606 OID 49159)
-- Name: builders builders_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builders
    ADD CONSTRAINT builders_pk PRIMARY KEY (id);


--
-- TOC entry 3233 (class 2606 OID 49161)
-- Name: builders builders_unique; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builders
    ADD CONSTRAINT builders_unique UNIQUE (label);


--
-- TOC entry 3223 (class 2606 OID 24589)
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (id);


--
-- TOC entry 3225 (class 2606 OID 24591)
-- Name: categories categories_unique; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_unique UNIQUE (label);


--
-- TOC entry 3229 (class 2606 OID 32775)
-- Name: modifiers modifiers_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.modifiers
    ADD CONSTRAINT modifiers_pk PRIMARY KEY (id);


--
-- TOC entry 3227 (class 2606 OID 24599)
-- Name: parts parts_pk; Type: CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.parts
    ADD CONSTRAINT parts_pk PRIMARY KEY (id);


--
-- TOC entry 3234 (class 2606 OID 49162)
-- Name: builder_features bike_builder_features_builders_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builder_features
    ADD CONSTRAINT bike_builder_features_builders_fk FOREIGN KEY (id_builder) REFERENCES public.builders(id);


--
-- TOC entry 3235 (class 2606 OID 40967)
-- Name: builder_features bike_builder_features_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.builder_features
    ADD CONSTRAINT bike_builder_features_categories_fk FOREIGN KEY (id_category) REFERENCES public.categories(id);


--
-- TOC entry 3237 (class 2606 OID 40960)
-- Name: modifiers modifiers_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.modifiers
    ADD CONSTRAINT modifiers_categories_fk FOREIGN KEY (id_category) REFERENCES public.categories(id);


--
-- TOC entry 3236 (class 2606 OID 24600)
-- Name: parts parts_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: biketorial-db_owner
--

ALTER TABLE ONLY public.parts
    ADD CONSTRAINT parts_categories_fk FOREIGN KEY (id_category) REFERENCES public.categories(id);


--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 3393
-- Name: DATABASE "biketorial-db"; Type: ACL; Schema: -; Owner: biketorial-db_owner
--

GRANT ALL ON DATABASE "biketorial-db" TO neon_superuser;


--
-- TOC entry 2071 (class 826 OID 16392)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- TOC entry 2070 (class 826 OID 16391)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


-- Completed on 2025-04-10 10:17:31 -03

--
-- PostgreSQL database dump complete
--

