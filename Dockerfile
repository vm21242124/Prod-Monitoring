# Base image: node 18 alpine
FROM node:18-alpine

# Set environment variables to avoid prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary packages in Alpine, including bash, redis, openjdk, curl, wget, and unzip
RUN apk add --no-cache bash openjdk11-jre redis curl wget unzip

# Install Elasticsearch
RUN wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.15.0-linux-x86_64.tar.gz \
  && tar -xzf elasticsearch-8.15.0-linux-x86_64.tar.gz \
  && mv elasticsearch-8.15.0 /usr/local/elasticsearch \
  && rm elasticsearch-8.15.0-linux-x86_64.tar.gz

# Install Kibana
RUN wget https://artifacts.elastic.co/downloads/kibana/kibana-8.15.0-linux-x86_64.tar.gz \
  && tar -xzf kibana-8.15.0-linux-x86_64.tar.gz \
  && mv kibana-8.15.0 /usr/local/kibana \
  && rm kibana-8.15.0-linux-x86_64.tar.gz

# Install Prometheus
RUN wget https://github.com/prometheus/prometheus/releases/download/v2.41.0/prometheus-2.41.0.linux-amd64.tar.gz \
  && tar -xzf prometheus-2.41.0.linux-amd64.tar.gz \
  && mv prometheus-2.41.0.linux-amd64 /usr/local/prometheus \
  && rm prometheus-2.41.0.linux-amd64.tar.gz

# Install Grafana
RUN wget https://dl.grafana.com/oss/release/grafana-10.1.0.linux-amd64.tar.gz \
  && tar -xzf grafana-10.1.0.linux-amd64.tar.gz \
  && mv grafana-10.1.0 /usr/local/grafana \
  && rm grafana-10.1.0.linux-amd64.tar.gz

# Copy your Node.js app
COPY . /usr/src/app
WORKDIR /usr/src/app

# Install Node.js dependencies
RUN npm install

# Expose necessary ports
EXPOSE 8080 6379 9200 5601 9090 3001

# Copy start script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Command to run all services
CMD ["/start.sh"]
