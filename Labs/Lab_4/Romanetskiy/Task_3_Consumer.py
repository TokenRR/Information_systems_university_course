import random
import time

import pika


def task_3_consumer():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    def callback(ch, method, properties, body):
        print(f'Отримано повідомлення: {body.decode("utf-8")}')

    channel.exchange_declare(exchange='product_exchange', exchange_type='topic')
    channel.queue_declare(queue='product_changes')

    # Видалення всіх існуючих зв'язків для queue
    for rk in ['product.*.*', 'product.*.update']:
        channel.queue_unbind(queue='product_changes', exchange='product_exchange', routing_key=rk)

    channel.queue_bind(exchange='product_exchange', queue='product_changes', routing_key='product.*.*')
    # channel.queue_bind(exchange='product_exchange', queue='product_changes', routing_key='product.*.update')

    channel.basic_consume(queue='product_changes', on_message_callback=callback, auto_ack=True)

    print('\n[LOG] Початок відстеження черги')
    channel.start_consuming()


try:
    task_3_consumer()
except KeyboardInterrupt:
    print('[LOG] Зупинено')