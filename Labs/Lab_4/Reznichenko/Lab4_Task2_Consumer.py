import pika
import sys
import os


def container_callback(queue_name):
    def callback(ch, method, properties, body):
        print(f"Ми отримали повідомлення: {body.decode('utf-8')} з ключем маршрутизації '{method.routing_key}' "
              f"з черги '{queue_name}'")

    return callback


def main():
    exchange_name = 'direct_exchange'
    queues_bindings = {
        "report:daily": "daily_queue",
        "report:weekly": "weekly_queue",
        "report:monthly": ["daily_queue", "weekly_queue"]
    }

    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    channel.exchange_declare(exchange=exchange_name, exchange_type='direct')

    for routing_key, queue_name in queues_bindings.items():
        if isinstance(queue_name, list):
            for q in queue_name:
                channel.queue_declare(queue=q, durable=False)
                channel.queue_bind(exchange=exchange_name, queue=q, routing_key=routing_key)
        else:
            channel.queue_declare(queue=queue_name, durable=False)
            channel.queue_bind(exchange=exchange_name, queue=queue_name, routing_key=routing_key)

    channel.basic_consume(queue="daily_queue", on_message_callback=container_callback('daily_queue'), auto_ack=True)
    channel.basic_consume(queue="weekly_queue", on_message_callback=container_callback('weekly_queue'), auto_ack=True)

    print("Started consuming messages...")
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
