const { AuditLogger } = require("../config/Logger");


exports.AuditMiddleware=async(req,res,next)=>{
    const auditLogEntry = {
        userId: req.user ? req.user.id : 'anonymous',
        action: `${req.method} ${req.path}`,
        timestamp: new Date().toISOString(),
        ip: req.ip,
        details: `Request from ${req.ip} to ${req.path}`,
      };
    
      AuditLogger.info('Audit event', auditLogEntry);
      next();
}

