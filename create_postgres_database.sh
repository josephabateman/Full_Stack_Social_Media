#make sure you have PostgreSQL installed on your
#machine and run this script from the 'SQL Shell (psql)' that
#is included on download

#Following script creates a postgres database

clear
echo "Starting shell script..";

CREATE DATABASE groupomania;
\c groupomania
CREATE TABLE users (user_id varchar PRIMARY KEY, user_email varchar(320) NOT NULL, password varchar(255) NOT NULL, first_name varchar(255) NOT NULL, last_name varchar(255) NOT NULL);
CREATE TABLE posts (post_id varchar(16) PRIMARY KEY, user_id varchar( 20 ) UNIQUE NOT NULL, caption varchar( 30 ) NOT NULL, file_upload varchar NOT NULL, time_stamp bigint NOT NULL, public_comments varchar[] NOT NULL, users_read text[]);
echo "Tables have been created. You can now run the server and open the website!";
cat create_postgres_database.sh