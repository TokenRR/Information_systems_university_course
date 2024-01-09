import pika
import random
import time

def main():
    counter = 0
    departments = ['marketing', 'sales', 'engineering']  # Список відділів компанії
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    for department in departments:
        exchange_name = f'{department}_exchange'
        queue_name = f'{department}_queue'

        channel.exchange_declare(exchange=exchange_name, exchange_type='topic')
        channel.queue_declare(queue=queue_name, durable=False, exclusive=False, auto_delete=False)
        channel.queue_bind(exchange=exchange_name, queue=queue_name, routing_key=f"#.company.{department}")

    while True:
        time.sleep(3)

        department = random.choice(departments)
        exchange_name = f'{department}_exchange'
        message = f"Повідомлення N {counter} для {department}"
        body = message.encode('utf-8')

        channel.basic_publish(exchange=exchange_name, routing_key=f"#{department}.company.{department}", body=body)

        print(f"Повідомлення надіслано до обмінника '{exchange_name}' для відділу '{department}' [N:{counter}]")
        counter += 1

    connection.close()

if __name__ == "__main__":
    main()
