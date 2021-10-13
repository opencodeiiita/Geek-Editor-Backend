from mailer import Mailer
import sys


mail = Mailer(email='tdevolopment@gmail.com',
              password='tdevolopment@69')

mail.send(receiver=f'{sys.argv[2]}', 
          subject=f'{sys.argv[4]}',
          message=f'Click this link {sys.argv[1]} to {sys.argv[4]}')

print(2)