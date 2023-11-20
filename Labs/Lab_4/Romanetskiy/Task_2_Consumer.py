import random
import time

import pika


def task_2_consumer():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    exchange_name = 'direct_alerts'

    channel.exchange_declare(exchange=exchange_name, exchange_type='direct')

    def emergency_callback(ch, method, properties, body):
        print(f"Отримано повідомлення з ключем маршрутизації 'alert:emergency': {body.decode('utf-8')}")

    def urgent_callback(ch, method, properties, body):
        print(f"Отримано повідомлення з ключем маршрутизації 'alert:urgent': {body.decode('utf-8')}")

    def warning_callback(ch, method, properties, body):
        print(f"Отримано повідомлення з ключем маршрутизації 'alert:warning': {body.decode('utf-8')}")

    # Черга для 'alert:emergency'
    emergency_queue = 'emergency_queue'
    channel.queue_declare(queue=emergency_queue, durable=False)
    channel.queue_bind(exchange=exchange_name, queue=emergency_queue, routing_key='alert:emergency')
    channel.basic_consume(queue=emergency_queue, on_message_callback=emergency_callback, auto_ack=True)

    # Черга для 'alert:urgent'
    urgent_queue = 'urgent_queue'
    channel.queue_declare(queue=urgent_queue, durable=False)
    channel.queue_bind(exchange=exchange_name, queue=urgent_queue, routing_key='alert:urgent')
    channel.basic_consume(queue=urgent_queue, on_message_callback=urgent_callback, auto_ack=True)

    # Черга для 'alert:warning'
    warning_queue = 'warning_queue'
    channel.queue_declare(queue=warning_queue, durable=False)
    channel.queue_bind(exchange=exchange_name, queue=warning_queue, routing_key='alert:warning')
    channel.queue_bind(exchange=exchange_name, queue=warning_queue, routing_key='alert')
    channel.basic_consume(queue=warning_queue, on_message_callback=warning_callback, auto_ack=True)

    print('\n[LOG] Початок відстеження черг')
    channel.start_consuming()


try:
    task_2_consumer()
except KeyboardInterrupt:
    print('[LOG] Зупинено')