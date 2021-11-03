package com.gohiking.geo.config.rabbitmq;
// package com.agim8.geodecoder.config.rabbitmq;

// import com.agim8.common.model.gson.GsonMessageConverter;
// import com.agim8.geodecoder.service.consumer.GeoConsumer;
// import org.apache.logging.log4j.LogManager;
// import org.apache.logging.log4j.Logger;
// import org.springframework.amqp.rabbit.connection.ConnectionFactory;
// import
// org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
// import
// org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
// import org.springframework.amqp.support.converter.MessageConverter;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// import static
// com.agim8.common.model.rabbitmq.QueueName.GEODECODER_MESSAGE_MAIN;;

// @Configuration
// public class RabbitMQConfiguration {

// private static Logger log =
// LogManager.getLogger(RabbitMQConfiguration.class);

// @Bean
// public MessageConverter jsonMessageConverter() {
// return new GsonMessageConverter();
// }

// @Bean
// MessageListenerAdapter geoListenerAdapter(GeoConsumer geoConsumer) {
// MessageListenerAdapter adapter = new MessageListenerAdapter(geoConsumer,
// "consume");
// adapter.setMessageConverter(jsonMessageConverter());
// return adapter;
// }

// @Bean
// SimpleMessageListenerContainer geoMessageContainer(ConnectionFactory
// connectionFactory,
// MessageListenerAdapter geoListenerAdapter) {
// SimpleMessageListenerContainer container = new
// SimpleMessageListenerContainer();
// container.setConnectionFactory(connectionFactory);
// container.setQueueNames(GEODECODER_MESSAGE_MAIN);
// container.setMessageListener(geoListenerAdapter);
// log.info("Listening on {}", GEODECODER_MESSAGE_MAIN);
// return container;
// }
// }
