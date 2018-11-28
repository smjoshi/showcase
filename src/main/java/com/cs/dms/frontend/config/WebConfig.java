package com.cs.dms.frontend.config;


import com.cs.dms.frontend.rest.config.RestApplicationConfig;
import org.glassfish.jersey.servlet.ServletContainer;
import org.glassfish.jersey.servlet.ServletProperties;

import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.*;





@Configuration
@ComponentScan(basePackages = { "com.cs.dms.frontend.web.controller" })
public class WebConfig implements WebMvcConfigurer {

//	@Override
//	public void configureViewResolvers(ViewResolverRegistry registry) {
//        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
//        resolver.setPrefix("/WEB-INF/views/");
//        resolver.setSuffix(".jsp");
//        resolver.setViewClass(JstlView.class);
//        registry.viewResolver(resolver);
//    }


	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}
//
//	@Bean (name = DispatcherServletAutoConfiguration.DEFAULT_DISPATCHER_SERVLET_BEAN_NAME)
//	public DispatcherServlet dispatcherServlet(){
//		return new DispatcherServlet();
//	}
//
//
//	@Bean
//	public ServletRegistrationBean dispatcherServletRegistration(){
//		ServletRegistrationBean dispatcherRegistration = new ServletRegistrationBean(this.dispatcherServlet(), "/web/*");
//		dispatcherRegistration.setName(DispatcherServletAutoConfiguration.DEFAULT_DISPATCHER_SERVLET_REGISTRATION_BEAN_NAME);
//
//		return dispatcherRegistration;
//
//	}
//
	/**
	 * @return
	 */
	@Bean
	ServletRegistrationBean jerseyServletRegistration(){
		ServletRegistrationBean jerSeyRegistration = new ServletRegistrationBean(new ServletContainer(), "/api/*");
		jerSeyRegistration.addInitParameter(ServletProperties.JAXRS_APPLICATION_CLASS, RestApplicationConfig.class.getName());

		return jerSeyRegistration;
	}


}
