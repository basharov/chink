#!/bin/bash
cd /home/ec2-user/chink

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 10.15.3

sudo npm install