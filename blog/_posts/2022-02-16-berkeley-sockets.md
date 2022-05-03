---
title: Berkeley Sockets
date: 2022-02-16
author: Wikipedia
category: blog
---

(Extracted from [Berkeley sockets - Wikipedia](https://en.wikipedia.org/wiki/Berkeley_sockets). Licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).)

## Header Files

The Berkeley socket interface is defined in several header files. The names and content of these files differ slightly between implementations. In general, they include:

| File         | Description                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| sys/socket.h | Core socket functions and data structures.                                                                                                                               |
| netinet/in.h | AF_INET and AF_INET6 address families and their corresponding protocol families, PF_INET and PF_INET6. These include standard IP addresses and TCP and UDP port numbers. |
| sys/un.h     | PF_UNIX and PF_LOCAL address family. Used for local communication between programs running on the same computer.                                                         |
| arpa/inet.h  | Functions for manipulating numeric IP addresses.                                                                                                                         |
| netdb.h      | Functions for translating protocol names and host names into numeric addresses. Searches local data as well as name services.                                            |

## Client-server example using TCP

### Server

Establishing a TCP server involves the following basic steps:

- Creating a TCP socket with a call to `socket()`.
- Binding the socket to the listening port (`bind()`) after setting the port number.
- Preparing the socket to listen for connections (making it a listening socket), with a call to `listen()`.
- Accepting incoming connections (`accept()`). This blocks the process until an incoming connection is received, and returns a socket descriptor for the accepted connection. The initial descriptor remains a listening descriptor, and `accept()` can be called again at any time with this socket, until it is closed.
- Communicating with the remote host with the API functions `send()` and `recv()`, as well as with the general-purpose functions `write()` and `read()`.
- Closing each socket that was opened after use with function `close()`

The following program creates a TCP server listening on port number 1100:

```c
  #include <sys/types.h>
  #include <sys/socket.h>
  #include <netinet/in.h>
  #include <arpa/inet.h>
  #include <stdio.h>
  #include <stdlib.h>
  #include <string.h>
  #include <unistd.h>
  
  int main(void)
  {
    struct sockaddr_in sa;
    int SocketFD = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (SocketFD == -1) {
      perror("cannot create socket");
      exit(EXIT_FAILURE);
    }
  
    memset(&sa, 0, sizeof sa);
  
    sa.sin_family = AF_INET;
    sa.sin_port = htons(1100);
    sa.sin_addr.s_addr = htonl(INADDR_ANY);
  
    if (bind(SocketFD,(struct sockaddr *)&sa, sizeof sa) == -1) {
      perror("bind failed");
      close(SocketFD);
      exit(EXIT_FAILURE);
    }
  
    if (listen(SocketFD, 10) == -1) {
      perror("listen failed");
      close(SocketFD);
      exit(EXIT_FAILURE);
    }
  
    for (;;) {
      int ConnectFD = accept(SocketFD, NULL, NULL);
  
      if (ConnectFD == -1) {
        perror("accept failed");
        close(SocketFD);
        exit(EXIT_FAILURE);
      }
  
      /* perform read write operations ... 
      read(ConnectFD, buff, size)
      */
  
      if (shutdown(ConnectFD, SHUT_RDWR) == -1) {
        perror("shutdown failed");
        close(ConnectFD);
        close(SocketFD);
        exit(EXIT_FAILURE);
      }
      close(ConnectFD);
    }

    close(SocketFD);
    return EXIT_SUCCESS;  
}
```
