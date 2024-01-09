import random
import time

import pika


def task_3_consumer():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    def callback(ch, method, properties, body):
        print(f'Отримано повідомлення: {body.decode("utf-8")}')

    channel.exchange_declare(exchange='news_exchange', exchange_type='topic')
    channel.queue_declare(queue='news')

    # Видалення всіх існуючих зв'язків для queue
    for rk in ['news.*']:
        channel.queue_unbind(queue='news', exchange='news_exchange', routing_key=rk)

    channel.queue_bind(exchange='news_exchange', queue='news', routing_key='news.*')

    channel.basic_consume(queue='news', on_message_callback=callback, auto_ack=True)

    print('\n[LOG] Початок відстеження черги')
    channel.start_consuming()

try:
    task_3_consumer()
except KeyboardInterrupt:
    print('[LOG] Зупинено')
