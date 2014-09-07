import os
import hashlib

email = raw_input("Please enter email: ")
password = raw_input("Please enter password: ")
salt = os.urandom(16).encode('hex')

hashedPassword = hashlib.sha512(salt + password).hexdigest()


#print 'email', email
#print 'password', password
#print 'salt', salt
#print 'hashed password', hashedPassword

mongoLine = 'db.users.insert({ "username" : "'+email+'", "email" : "'+email+'", "hash" : "'+hashedPassword+'", "salt" : "'+salt+'"})'
print mongoLine
