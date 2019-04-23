
### Run/stop postgres server locally:
    pg_ctl -D /usr/local/var/postgres start/stop 

### Connect to EC2 instance
ssh -i chink.pem ec2-user@ec2-100-24-68-196.compute-1.amazonaws.com

### RDS instance
chinkdb.ca1ujtzsejpi.us-east-1.rds.amazonaws.com

### To connect to postgres db (password is chinkmaster):
    psql -h chinkdb.ca1ujtzsejpi.us-east-1.rds.amazonaws.com -U chinkmaster -d chinkdb

### To exit from a psql client console:
    \q [enter]
    
### psql commands
https://www3.ntu.edu.sg/home/ehchua/programming/sql/PostgreSQL_GetStarted.html