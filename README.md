run 'nodemon server' on backend
run 'npm run serve' on frontend

Layout of postgres DB:

         List of relations
 Schema | Name  | Type  |  Owner   
--------+-------+-------+----------
 public | posts | table | postgres
 public | users | table | postgres
(2 rows)

TABLES:

                                               Table "public.posts"
     Column      |         Type          | Collation | Nullable | Default | Storage  | Stats target | Description 
-----------------+-----------------------+-----------+----------+---------+----------+--------------+-------------
 caption         | character varying(30) |           |          |         | extended |              | 
 file_upload     | character varying     |           |          |         | extended |              | 
 user_id         | character varying(20) |           |          |         | extended |              | 
 post_id         | character varying(16) |           | not null |         | extended |              | 
 time_stamp      | bigint                |           |          |         | plain    |              | 
 public_comments | character varying[]   |           |          |         | extended |              | 
 users_read      | text[]                |           |          |         | extended |              | 
Indexes:
    "posts_pkey" PRIMARY KEY, btree (post_id)
Access method: heap


                                             Table "public.users"
   Column   |          Type          | Collation | Nullable | Default | Storage  | Stats target | Description 
------------+------------------------+-----------+----------+---------+----------+--------------+-------------
 user_email | character varying(320) |           | not null |         | extended |              | 
 password   | character varying(255) |           | not null |         | extended |              | 
 user_id    | character varying(20)  |           | not null |         | extended |              | 
 last_name  | character varying      |           |          |         | extended |              | 
 first_name | character varying      |           |          |         | extended |              | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (user_id)
Access method: heap