const winston= require('winston')
const {Client} =require('@elastic/elasticsearch')

const {ElasticsearchTransport}=require('winston-elasticsearch')

const esTransportOpts = {
    client:new Client({node:'http://localhost:9200'}),
    indexPrefix: 'logs',
  };
  
exports.elasticLogger= winston.createLogger({
    level:'info',
    format: winston.format.json(), 
    transports:[
        new ElasticsearchTransport(esTransportOpts),
        new winston.transports.Console()
    ]
})

const auditTransportOpts = {
    client:new Client({node:'http://localhost:9200'}),
    indexPrefix: 'audit-logs',
    ensureMappingTemplate: true,
    mappingTemplate: {
      index_patterns: ['audit-logs-*'],
      settings: {
        number_of_shards: 1,
      },
      mappings: {
        properties: {
          userId: { type: 'keyword' },
          action: { type: 'text' },
          timestamp: { type: 'date' },
          ip: { type: 'ip' },
          details: { type: 'text' },
        },
      },
    },
  };
  
exports.AuditLogger=winston.createLogger({
    level:'info',
    format: winston.format.json(), 
    transports:[
        new ElasticsearchTransport(auditTransportOpts),
        new winston.transports.Console()
    ]
})