package com.lemosen.core.orm;

import org.hibernate.resource.jdbc.spi.StatementInspector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CustomStatementInspector implements StatementInspector {

    private final static Logger LOG = LoggerFactory.getLogger(CustomStatementInspector.class);

    @Override
    public String inspect(String sql) {
        LOG.trace(sql);
        return sql;
    }
}
