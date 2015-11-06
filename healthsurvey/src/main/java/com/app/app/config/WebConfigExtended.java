package com.app.app.config;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import com.athena.config.server.WebConfig;
import org.springframework.context.annotation.Bean;

/**
 *
 *
 * @author Anant
 *
 */
@Configuration
@EnableTransactionManagement
@ComponentScan(basePackages = { "com.athena", "com.spartan", "com.app.app" })
public class WebConfigExtended extends WebConfig {
}
