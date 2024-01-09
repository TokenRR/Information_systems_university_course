import pika
import random
import time

def main():
    counter = 0
    exchange = 'direct_exchange'
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    channel.exchange_declare(exchange=exchange, exchange_type='direct')

    while True:
        time_to_sleep = random.randint(1, 5)
        time.sleep(time_to_sleep)

        message = f"Повідомлення N {counter}"
        body = message.encode('utf-8')

        routing_key = 'prod' if counter % 2 == 0 else 'dev'

        channel.basic_publish(exchange=exchange,
                              routing_key=routing_key,
                              body=body)

        print(f"Повідомлення надіслано до обмінника '{exchange}' з ключем маршрутизації '{routing_key}' [N:{counter}]")
        counter += 1

    connection.close()

if __name__ == "__main__":
    main()
