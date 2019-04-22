#!/bin/bash
# Set ownership for all folders
chown -R ec2-user:ec2-user /home/ec2-user/chink

# set files to 644 [except *.pl *.cgi *.sh]
find /home/ec2-user/chink -type f -not -name ".pl" -not -name ".cgi" -not -name "*.sh" -print0 | xargs -0 chmod 0644

# set folders to 755
find /home/ec2-user/chink -type d -print0 | xargs -0 chmod 0755