import pika
import random
import time
import sys
import os

def main():
    counter = 1
    exchange_name = 'direct_exchange'
    routing_keys = ["report:daily", "report:weekly", "report:monthly"]

    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    channel.exchange_declare(exchange=exchange_name, exchange_type='direct')

    while True:
        time_to_sleep = 3
        time.sleep(time_to_sleep)

        routing_key = random.choice(routing_keys)
        message = f"Повідомлення N {counter}"
        body = message.encode('utf-8')

        channel.basic_publish(
            exchange=exchange_name,
            routing_key=routing_key,
            body=body
        )

        print(f"Повідомлення надіслано з ключем маршрутизації '{routing_key}' [N:{counter}]")
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
