import pika
import random
import time
import sys
import os


def main():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    counter = 1

    channel.exchange_declare(exchange='sports_news', exchange_type='topic')  # Creating a topic exchange

    while True:
        time.sleep(1)
        sport_type = random.choice(['football', 'basketball', 'tennis'])  # Randomly choosing a sport type
        news_category = random.choice(['transfer-news', 'match-report', 'injury-update'])  # Random news category

        routing_key = f'sports.{sport_type}.{news_category}'  # Forming the routing key

        message = f"[N:{counter}], {sport_type}, category: {news_category}"
        body = message.encode('utf-8')

        channel.basic_publish(exchange='sports_news',
                              routing_key=routing_key,
                              body=body)

        print(f"News sent [{counter}] [Routing Key: {routing_key}]")
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
