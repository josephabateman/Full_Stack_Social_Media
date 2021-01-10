#make sure you have PostgreSQL installed on your
#machine and run this script from the 'SQL Shell (psql)' that
#is included on download

#Following script creates a postgres database
clear
echo "Starting shell script..";
node -v;
npm -v;
git --version;
echo "you can now run the server and open the website!";
cat createPostgresDatabase.sh