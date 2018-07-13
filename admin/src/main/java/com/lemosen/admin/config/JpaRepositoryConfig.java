package com.lemosen.admin.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.annotation.Resource;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Map;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "webEntityManagerFactory",
        transactionManagerRef = "webTransactionManager",
        basePackages = {
                "com.lemosen.core.dao",
        })
//设置Repository所在位置
public class JpaRepositoryConfig {

    @Autowired
    private JpaProperties jpaProperties;

    @Autowired
    private DataSource webDataSource;

    /**
     * 我们通过LocalContainerEntityManagerFactoryBean来获取EntityManagerFactory实例
     *
     * @return
     */
    @Bean(name = "webEntityManagerFactoryBean")
    @Primary
    public EntityManagerFactory webEntityManagerFactoryBean() {
        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setJpaVendorAdapter(vendorAdapter);
        factory.setPackagesToScan("com.lemosen.core.entity");
        factory.setDataSource(webDataSource);//数据源
        factory.setJpaPropertyMap(jpaProperties.getProperties());
        factory.afterPropertiesSet();//在完成了其它所有相关的配置加载以及属性设置后,才初始化
        return factory.getObject();
    }


    /**
     * EntityManagerFactory类似于Hibernate的SessionFactory,mybatis的SqlSessionFactory
     * 总之,在执行操作之前,我们总要获取一个EntityManager,这就类似于Hibernate的Session, mybatis的sqlSession.
     *
     * @param builder
     * @return
     */
    @Bean(name = "webEntityManagerFactory")
    public EntityManagerFactory webEntityManagerFactory(EntityManagerFactoryBuilder builder) {
        return this.webEntityManagerFactoryBean();
    }

    /**
     * 配置事务管理器
     *
     * @return
     */
    @Bean(name = "webTransactionManager")
    public PlatformTransactionManager writeTransactionManager(EntityManagerFactoryBuilder builder) {
        return new JpaTransactionManager(webEntityManagerFactory(builder));
    }
}
