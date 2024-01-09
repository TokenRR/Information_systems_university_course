import telebot
from config import TOKEN

bot = telebot.TeleBot(TOKEN)

@bot.message_handler(commands=['start'])
def handle_start(message):
    HI_MESSAGE = \
'Вітаю!\n\
Я бот-хелпер створений авторами сервісу Pizza Shop 🍕\n\
Для отримання допомоги використовуйте команду /help_me'
    bot.send_message(message.chat.id, HI_MESSAGE)

@bot.message_handler(commands=['help_me'])
def handle_help_me(message):
    bot.send_message(message.chat.id, 'Опишіть Вашу проблему')
    bot.register_next_step_handler(message, process_user_problem)

def process_user_problem(message):
    # Тут ви можете обробляти отримане від користувача повідомлення
    # і відправляти повідомлення відповідно до вашої логіки обробки.
    bot.reply_to(message, 'Ваш запит оброблено, чекайте повідомлення від оператора')

@bot.message_handler(func=lambda message: True)
def handle_other_messages(message):
    bot.reply_to(message, 'Вибачте, я вас не розумію. Скористайтесь моїми командами:\n/start\n/help_me')

if __name__ == '__main__':
    bot.set_my_commands([
        telebot.types.BotCommand('/start', 'Привіт, я бот-хелпер'),
        telebot.types.BotCommand('/help_me', 'Надання допомоги'),
        ])
    bot.polling(none_stop=True)
