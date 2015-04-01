# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
Task::Application.config.secret_key_base = 'b1dcd5aa462ad2fcd5b272f88765a2c3c09a182ab3d1da8824dc91304263adfd69a97deeda7882f2d149246f084adcb1754f8f17efa4e01bcf0db856f56959b3'
