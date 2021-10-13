from mailer import Mailer
import sys


mail = Mailer(email='tdevolopment@gmail.com',
              password='tdevolopment@69')

mail.send(receiver=f'{sys.argv[2]}', 
          subject='Verification of email',
          message=f'Click this link {sys.argv[1]} to verify your email :)')

print(2)