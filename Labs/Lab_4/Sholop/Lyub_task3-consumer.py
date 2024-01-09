import pika

def callback(ch, method, properties, body):
    print(f"Ми отримали повідомлення: {body.decode('utf-8')}")

def main():
    departments = ['marketing', 'sales', 'engineering']  # Список відділів компанії
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    for department in departments:
        queue_name = f'{department}_queue'

        channel.queue_declare(queue=queue_name, durable=False, exclusive=False, auto_delete=False)
        channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

    print("Споживачі підписані на черги відділів компанії")
    channel.start_consuming()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print('Переривання')
