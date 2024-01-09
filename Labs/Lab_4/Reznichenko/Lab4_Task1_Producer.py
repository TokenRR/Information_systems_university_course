import pika
import random
import time
import os
import sys


def main():
    counter = 1
    queue = 'Reznichenko'
    while True:
        time_to_sleep = random.randint(1, 5)
        time.sleep(time_to_sleep)

        connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
        channel = connection.channel()

        channel.queue_declare(queue=queue, durable=False, exclusive=False, auto_delete=False)

        message = f"Повідомлення {counter}"
        body = message.encode('utf-8')

        channel.basic_publish(exchange='',
                              routing_key=queue,
                              body=body)

        print(f"Повідомлення надіслано у Default Exchange [N:{counter}]")
        counter += 1

    connection.close()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
