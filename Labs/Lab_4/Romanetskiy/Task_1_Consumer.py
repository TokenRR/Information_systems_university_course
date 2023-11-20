import random
import time

import pika


def task_1_consumer():
    global msg_counter
    msg_counter = 1
    QUEUE = 'Romanetskiy'

    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    def callback(ch, method, properties, body):
        global msg_counter
        print(f'Отримано повідомлення N {msg_counter}: {body.decode("utf-8")}')
        msg_counter += 1

    channel.queue_declare(queue=QUEUE, durable=False, exclusive=False, auto_delete=False)

    channel.basic_consume(queue=QUEUE, on_message_callback=callback, auto_ack=True)

    print('\n[LOG] Початок відстеження черги')
    channel.start_consuming()


try:
    task_1_consumer()
except KeyboardInterrupt:
    print('[LOG] Зупинено')