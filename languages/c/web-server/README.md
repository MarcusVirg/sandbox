# CSci4061 F2018 Project 3 - Web Server

* login:  virgi019 (login used to submit)
* date:  12/10/2018
* name:  Tayler Haviland, Marcus Virginia
* group: project_3 23
* id:  havil016, virgi019

## Repo Instructions

`Branch "server"` will be treated as the main branch for this project.
Create new branches for each feature you are working on. Always merge back into the master `server` branch, as this will be considered the main branch.

## Running the Web Server

This web server is ran with the executable `./web_server`. This takes 7 arguments so the full command looks like:

```shell
​$ ./web_server port path num_dispatch num_workers dynamic_flag qlen cache_entries
```

Here is an explanation of each argument:

* `port`​ number can be specified (you may only use ports 1025 - 65535 by default)
* `path​` is the path to your web root location from where all the files will be served
* `num_dispatcher​s` **Default: 5** is how many dispatcher threads to start up
* `num_workers` **Default: 5**​ is how many worker threads to start up
* `dynamic_flag` **Default: 0**​ indicates whether the worker thread pool size should be static or dynamic. *0 - static, 1 - dynamic*
* `queue_length` **Default: 10**​ is the fixed, bounded length of the request queue
* `cache_entries` **Default: 10**​​ is the number of entries available in the cache (an alternative way to do this would be to specify the maximum memory used by the cache, but we are just using a limit on the number of entries

Here is an example call:

```shell
​$ ./web_server 3000 /mnt/d/Projects/csci-4061/server-root 5 5 0 10 10
```

## Under the Hood

This program uses three types of threads to operate, the main kernel thread, the dispatcher thread, and the worker thread.
The main kernel thread initializes the other threads and the request queue.
The dispatcher thread accepts request and puts them into the request queue. The worker thread looks in the request queue and pulls the requested file from the cache or from the disk. The worker thread then writes that request back into the socket and the page is served.

## Caching

Our cache implements the LRU replacement policy. When the cache is full
it finds the least used cache entry by finding the minimum number of requests and replaces that entry with a new value from disk.

## Dynamic Worker Policy

We did not implement the dynamic worker policy.

## Contributions

Marcus:

* Setup thread code, locks, and CV
* Coded dispatch thread/request queue operations
* Coded server logging

Tayler:

* Setup up argument handlers
* Coded worker thread/cache operations
