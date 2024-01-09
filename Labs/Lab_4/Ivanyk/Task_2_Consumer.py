import random
import time

import pika


def task_2_consumer():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    exchange_name = 'direct_routing'

    channel.exchange_declare(exchange=exchange_name, exchange_type='direct')

    def production_callback(ch, method, properties, body):
        print(f"Отримано повідомлення з ключем маршрутизації 'production': {body.decode('utf-8')}")

    def testing_callback(ch, method, properties, body):
        print(f"Отримано повідомлення з ключем маршрутизації 'testing': {body.decode('utf-8')}")

    def development_callback(ch, method, properties, body):
        print(f"Отримано повідомлення з ключем маршрутизації 'development': {body.decode('utf-8')}")

    # Черга для 'production'
    production_queue = 'production_queue'
    channel.queue_declare(queue=production_queue, durable=False)
    channel.queue_bind(exchange=exchange_name, queue=production_queue, routing_key='production')
    channel.basic_consume(queue=production_queue, on_message_callback=production_callback, auto_ack=True)

    # Черга для 'testing'
    testing_queue = 'testing_queue'
    channel.queue_declare(queue=testing_queue, durable=False)
    channel.queue_bind(exchange=exchange_name, queue=testing_queue, routing_key='testing')
    channel.basic_consume(queue=testing_queue, on_message_callback=testing_callback, auto_ack=True)

    # Черга для 'development'
    development_queue = 'development_queue'
    channel.queue_declare(queue=development_queue, durable=False)
    channel.queue_bind(exchange=exchange_name, queue=development_queue, routing_key='development')
    channel.queue_bind(exchange=exchange_name, queue=development_queue, routing_key='debug')
    channel.basic_consume(queue=development_queue, on_message_callback=development_callback, auto_ack=True)

    print('\n[LOG] Початок відстеження черг')
    channel.start_consuming()


try:
    task_2_consumer()
except KeyboardInterrupt:
    print('[LOG] Зупинено')
