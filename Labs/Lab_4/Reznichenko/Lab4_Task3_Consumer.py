import pika
import sys
import os


def callback(ch, method, properties, body):
    print(f"Отримано: {body.decode('utf-8')}      \t[Routing Key: {method.routing_key}]")

def main():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    channel.exchange_declare(exchange='sports_news', exchange_type='topic')  # Creating a topic exchange
    result = channel.queue_declare('', exclusive=True)
    queue_name = result.method.queue

    channel.queue_bind(exchange='sports_news', queue=queue_name, routing_key='sports.football.#')  # Subscribing to football news
    channel.queue_bind(exchange='sports_news', queue=queue_name, routing_key='sports.basketball.#')  # Subscribing to basketball news
    channel.queue_bind(exchange='sports_news', queue=queue_name, routing_key='sports.tennis.#')  # Subscribing to tennis news

    channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)
    print("Waiting for news...")

    channel.start_consuming()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
