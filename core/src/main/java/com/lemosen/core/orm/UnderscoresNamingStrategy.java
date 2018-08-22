package com.lemosen.core.orm;

import org.hibernate.cfg.ImprovedNamingStrategy;

/**
 * 自定义命名策略
 *
 */
public class UnderscoresNamingStrategy extends ImprovedNamingStrategy {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Override
    public String columnName(String columnName) {
        return addUnderscores(columnName).toUpperCase();
    }

    @Override
    public String tableName(String tableName) {
        return addUnderscores(tableName).toLowerCase();
    }

    @Override
    public String classToTableName(String className) {
        return tableName(className);
    }

    @Override
    public String propertyToColumnName(String propertyName) {
        return addUnderscores(propertyName).toUpperCase();
    }

}
