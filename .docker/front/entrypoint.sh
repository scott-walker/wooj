#!/bin/sh
service nginx start

cd /var/www
npm run dev
