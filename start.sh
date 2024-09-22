#!/bin/bash

# Start Redis
redis-server &

# Start Elasticsearch
/usr/local/elasticsearch/bin/elasticsearch -d &

# Start Kibana
/usr/local/kibana/bin/kibana &

# Start Prometheus
/usr/local/prometheus/prometheus --config.file=/etc/prometheus/prometheus.yml &

# Start Grafana
/usr/local/grafana/bin/grafana-server &

# Start Node.js app
npm start

# Keep the container running
tail -f /dev/null
