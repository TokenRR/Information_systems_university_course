import pika
import sys
import os

def callback(ch, method, properties, body):
    routing_key = method.routing_key
    queue_name = method.routing_key.split('_')[0] + "_queue"  # Assuming queue names are in format 'prod_queue' or 'dev_queue'
    print(f"Ми отримали повідомлення: {body.decode('utf-8')}")
    print(f"З черги '{queue_name}' з ключем маршрутизації '{routing_key}'\n")

def main():
    exchange = 'direct_exchange'
    queue_prod = 'prod_queue'
    queue_dev = 'dev_queue'
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    channel.exchange_declare(exchange=exchange, exchange_type='direct')

    channel.queue_declare(queue=queue_prod, durable=False, exclusive=False, auto_delete=False)
    channel.queue_declare(queue=queue_dev, durable=False, exclusive=False, auto_delete=False)

    channel.queue_bind(exchange=exchange, queue=queue_prod, routing_key='prod')
    channel.queue_bind(exchange=exchange, queue=queue_dev, routing_key='dev')

    channel.basic_consume(queue=queue_prod, on_message_callback=callback, auto_ack=True)
    channel.basic_consume(queue=queue_dev, on_message_callback=callback, auto_ack=True)

    print("Subscribed to the queues 'prod_queue' and 'dev_queue'")
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
