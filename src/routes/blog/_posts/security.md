---
title: How we protect your privacy
description: Learn about how we implement end-to-end encryption to protect your messages and chats, ensuring that only you and the people you are chatting with can read your messages.
date: 2024-02-11
---
## What is end-to-end encryption? How does it keep me safe?

End-to-end encryption ensures that only the intended participants can
access the content of a conversation. Because the content of the messages is
encrypted using a **shared secret** that only both ends know, no one else can
read the messages, not even us.

Boble has no ability to see the content of your messages, because the
encryption and decryption of messages sent and received on Boble happens
*entirely on your device*, with your shared secret. Before a message ever leaves
your device, it is encrypted with your shared secret, using strong cryptographic
algorithms. Once the message reaches our servers, it is stored in an encrypted
form. Only the recipient has the keys to decrypt and read the messages, we do
not store the keys on our servers.

Even in a data breach scenario, malicious actors would not be able to decrypt
and read the messages, rendering the data useless to them.

This process happens by default, and is completely transparent to you. You don't
need to do anything to enable it, but you can confirm that your conversations
are protected by comparing the security code on your device with other participants.

## How does Boble implement end-to-end encryption?

When you start a conversation with someone on Boble, your device and the
recipient's device exchange a series of cryptographic keys. These keys are used
to encrypt and decrypt the messages you send to each other. The keys are
exchanged in a way that ensures only you and the recipient can read the content
of your messages.

## An overview of the encryption process

### Key generation

Keys are generated using the
[Elliptic-Curve Diffie-Hellman](https://en.wikipedia.org/wiki/Elliptic-curve_Diffie%E2%80%93Hellman) protocol.

Elliptic-curve Diffie–Hellman (ECDH) is an anonymous **key agreement protocol** that allows two parties, each having an elliptic-curve public–private key pair, to establish a shared secret over an insecure channel.

### Encryption and decryption

Once this shared secret is established, it is used in your device before sending
a message to encrypt the message. The recipient's device uses the same shared
secret to decrypt the message. This process ensures that only the intended
recipient can read the message. Boble has no way to decrypt the message, even if
we wanted to.

Data is encrypted using [AES-GCM](https://en.wikipedia.org/wiki/Galois/Counter_Mode), which is a strong and widely used **encryption algorithm**.
