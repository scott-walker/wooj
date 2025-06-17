FROM ubuntu:latest

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN apt-get update && apt-get install -y nginx curl git

RUN curl -sL https://deb.nodesource.com/setup_22.x | bash -
RUN apt-get install -y nodejs
RUN npm install npm@latest -g

WORKDIR /root
RUN git clone https://github.com/seebi/dircolors-solarized

WORKDIR /var/www
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
# CMD ["tail", "-f", "/dev/null"]
