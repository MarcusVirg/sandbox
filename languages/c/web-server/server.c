#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#include <pthread.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/time.h>
#include <fcntl.h>
#include <sys/time.h>
#include <time.h>
#include "util.h"
#include <stdbool.h>
#include <unistd.h>
#include <signal.h>

#define MAX_THREADS 100
#define MAX_queue_len 100
#define MAX_CE 100
#define INVALID -1
#define BUFF_SIZE 1024


/*

- Log file format correct: Threads, etc.
- Locks on Log file
- Cache update policy

*/

/*
  THE CODE STRUCTURE GIVEN BELOW IS JUST A SUGGESTION. FEEL FREE TO MODIFY AS NEEDED
*/

// structs:
typedef struct request_queue {
  int fd;
  char *request;
} request_t;

typedef struct cache_entry {
  char *request;
  char *content;
  int size;
  int accessCount;
} cache_entry_t;

int read_request = 0;
int write_request = 0;
int queue_length = 10;
int cache_size = 10;
int dynamic_flag = 0;
cache_entry_t * cache_ptr;
pthread_mutex_t req_mtx;
pthread_mutex_t cache_mtx;
pthread_mutex_t log_mtx;
pthread_cond_t wrote_request_cond;

/* ************************ Dynamic Pool Code ***********************************/
// Extra Credit: This function implements the policy to change the worker thread pool dynamically
// depending on the number of requests
void * dynamic_pool_size_update(void *arg) {
  while(1) {
    // Run at regular intervals
    // Increase / decrease dynamically based on your policy
  }
}
/**********************************************************************************/

/* ************************************ Cache Code ********************************/

// Function to check whether the given request is present in cache
int getCacheIndex(char *request){
  /// return the index if the request is present in the cache

  for(int i = 0; i < cache_size; i++){
    if(cache_ptr[i].request == NULL){
      return -1;
    }
    else if(strcmp(cache_ptr[i].request, request) == 0){
      return i;
    }
  }
  return -1;
}

// Function to add the request and its file content into the cache
void addIntoCache(char * request, char * content, int size){
  // It should add the request at an index according to the cache replacement policy
  // Make sure to allocate/free memeory when adding or replacing cache entries
  char * content_ptr = malloc(size);
  // memset(content_ptr,content,size);
  memcpy(content_ptr,content,size);
  char * request_ptr = strdup(request);

  // This needs to be changed to be dynamic
  //Check if free slot
  for(int i = 0; i < cache_size; i++){
    if(cache_ptr[i].size == 0){
      cache_ptr[i].request = request_ptr;
      cache_ptr[i].content = content_ptr;
      cache_ptr[i].size = size;
      cache_ptr[i].accessCount = 0;
      return;
    }
  }


  int lowestAccess = -1;
  int replacement_index = 0;
  for(int i = 0; i < cache_size; i++){
    if(lowestAccess < 0){
      lowestAccess = cache_ptr[i].accessCount;
    }
    if(cache_ptr[i].accessCount <= lowestAccess){
      replacement_index = i;
      lowestAccess = cache_ptr[i].accessCount;
    }
  }
  //printf("cache_arr[%d]: request %s, size %d, accessCount: %d, lowestAccess: %d\n",replacement_index,cache_ptr[replacement_index].request, cache_ptr[replacement_index].size, cache_ptr[replacement_index].accessCount, lowestAccess);

  free(cache_ptr[replacement_index].request);
  free(cache_ptr[replacement_index].content);

  cache_ptr[replacement_index].request = request_ptr;
  cache_ptr[replacement_index].content = content_ptr;
  cache_ptr[replacement_index].size = size;
  cache_ptr[replacement_index].accessCount = 0;

  pthread_mutex_unlock(&cache_mtx);

  return;
}

// clear the memory allocated to the cache
void deleteCache(){
  // De-allocate/free the cache memory
  for(int i = 0; i < cache_size; i++) {
    free(cache_ptr[i].request);
    free(cache_ptr[i].content);
  }
  free(cache_ptr);
}

// Function to initialize the cache
void initCache(size_t cache_size){
  // Allocating memory and initializing the cache array

  cache_ptr = malloc(sizeof(cache_entry_t) * cache_size);
  // Clearing allocated area
  memset(cache_ptr,0,sizeof(cache_entry_t)*cache_size);

}

// Function to open and read the file from the disk into the memory
// Add necessary arguments as needed
// Maybe we should return num of bytes?
int readFromDisk(char *filename, char *buff, long size) {

  //printf("Attempting to open file: %s\n", filename);
  int file = open(filename, O_RDONLY);

  if(file <= 0) {
    printf("Failed to open file: %s\n", filename);
    return -1;
  }

  // Open and read the contents of file given the request
  if(read(file, buff, size) < 0) {
    return -1;
  }

  close(file);
  return 0;
}

/**********************************************************************************/

/* ************************************ Utilities ********************************/
// Function to get the content type from the request
char* getContentType(char * filename) {
  // Should return the content type based on the file type in the request
  const char * dot = strrchr(filename, '.');
  if(!dot) {
    return "text/plain";
  } else if (strcmp(dot + 1, "html") == 0 || strcmp(dot + 1, "htm") == 0) {
    return "text/html";
  } else if (strcmp(dot + 1, "jpg") == 0 || strcmp(dot + 1, "jpeg") == 0) {
    return "image/jpeg";
  } else if (strcmp(dot + 1, "gif") == 0 ) {
    return "image/gif";
  } else {
    return "text/plain";
  }
}

// This function returns the current time in milliseconds
long getCurrentTimeInMicro() {
  struct timeval curr_time;
  gettimeofday(&curr_time, NULL);
  return curr_time.tv_sec * 1000000 + curr_time.tv_usec;
}

/**********************************************************************************/

// Function to receive the request from the client and add to the queue
void * dispatch(void *arg) {
  while (1) {
    // Accept client connection
    int fd = accept_connection();
    if(fd >= 0) {

      char filename[BUFF_SIZE];
      char * file;
      request_t * requests = (request_t *) arg;

      // Get request from the client
      if(get_request(fd, filename) == 0) {
        file = filename;
        //removing initial forward slash
        if(filename[0] == '/'){
          file++;
        }

        pthread_mutex_lock(&req_mtx);
        // Add the request into the queue
        requests[write_request].fd = fd;
        requests[write_request].request= file;

        // check if we are at the end of the queue array and then start again
        // from index 0
        if(write_request + 1 == queue_length) {
          write_request = 0;
        } else {
          write_request++;
        }int cache_size;
        // printf("Write request: %d\n", write_request);
        // unlock and broadcast to wake all worker threads
        pthread_mutex_unlock(&req_mtx);
        pthread_cond_broadcast(&wrote_request_cond);
      }
    }
  }

  return NULL;
}

/**********************************************************************************/

// Function to retrieve the request from the queue, process it and then return a result to the client
void * worker(void *arg) {
  FILE *log_file;
  request_t * requests = (request_t *) arg;
  int cache_index;
  int request_count = 0;

  while (1) {
    pthread_mutex_lock(&req_mtx);
    while(read_request == write_request) {
      pthread_cond_wait(&wrote_request_cond, &req_mtx);
    }
    // We have the lock now
    // Start recording time
    int start_time = getCurrentTimeInMicro();

    // Get the request from the queue
    char * filename = requests[read_request].request;
    int fd = requests[read_request].fd;
    char * filetype = getContentType(filename);
    cache_index = getCacheIndex(filename);

    if(read_request + 1 == queue_length) {
      read_request = 0;
    } else {
      // increment read_request
      read_request++;
    }

    pthread_mutex_unlock(&req_mtx);

    // Get the data from the disk or the cache
    if(cache_index != -1){
      //This allows us to only send the size of the file.
      pthread_mutex_lock(&cache_mtx);
      int content_size = cache_ptr[cache_index].size;
      char content_buff[content_size];
      memcpy(content_buff,cache_ptr[cache_index].content,content_size);
      cache_ptr[cache_index].accessCount++;
      pthread_mutex_unlock(&cache_mtx);

      // Stop recording the time
      int stop_time = getCurrentTimeInMicro() - start_time;
      // return the result
      return_result(fd, filetype, content_buff, content_size);
      // Log the request into the file and terminal
      log_file = fopen("web_server_log", "a");
      char entry[BUFF_SIZE];
      sprintf(entry, "[%ld][%d][%d][%s][%d][%dus][%s]\n", pthread_self(), ++request_count, fd, filename, content_size, stop_time, "HIT");
      printf("%s\n", entry); // Change to a write once we get there
      pthread_mutex_lock(&log_mtx);
      fputs(entry, log_file);
      pthread_mutex_unlock(&log_mtx);
      fclose(log_file);

    } else {
      //This allows us to only send the size of the file.
      struct stat st;
      stat(filename,&st);
      off_t size = st.st_size;
      char buff[size];

      if(readFromDisk(filename, buff, size) == 0){
        // Stop recording the time
        int stop_time = getCurrentTimeInMicro() - start_time;

        // return the result
        return_result(fd, filetype, buff, size);

        // then cache
        pthread_mutex_lock(&cache_mtx);
        addIntoCache(filename, buff, size);
        pthread_mutex_unlock(&cache_mtx);

        // Log the request into the file and terminal
        log_file = fopen("web_server_log", "a");
        char entry[BUFF_SIZE];
        sprintf(entry, "[%ld][%d][%d][%s][%ld][%dus][%s]\n", pthread_self(), ++request_count, fd, filename, size, stop_time, "MISS");
        printf("%s\n", entry); // Change to a write once we get there
        pthread_mutex_lock(&log_mtx);
        fputs(entry, log_file);
        // Unlock here
        pthread_mutex_unlock(&log_mtx);
        fclose(log_file);

      } else {
        char * err_msg = "404, the page you are looking for does not exist.";
        // Stop recording the time
        int stop_time = getCurrentTimeInMicro() - start_time;
        // Log the error into the file and terminal
        log_file = fopen("web_server_log", "a");
        char entry[BUFF_SIZE];
        sprintf(entry, "[%ld][%d][%d][%s][%s][%dus][%s]\n", pthread_self(), ++request_count, fd, filename, err_msg, stop_time, "ERROR");
        printf("%s\n", entry);
        // lock here
        pthread_mutex_lock(&log_mtx);
        fputs(entry, log_file);
        // Unlock here
        pthread_mutex_unlock(&log_mtx);
        fclose(log_file);
        // return the error
        return_error(fd, err_msg);
      }
    }
  }

  return NULL;
}

void sig_handler(int sig) {
  deleteCache();
  exit(1);
}

/**********************************************************************************/

int main(int argc, char **argv) {

  int debug = 0;
  int PORT;
  char *PATH;
  int num_dispatchers = 5;
  int num_workers = 5;

  signal(SIGINT, sig_handler);

  // Error check on number of arguments
  // Decided to check if caching is enabled [argc == 8 -> Caching enabled]
    switch(argc){
      case 3:
        PORT = atoi(argv[1]);
        PATH = argv[2];
        break;
      case 4:
        PORT = atoi(argv[1]);
        PATH = argv[2];
        num_dispatchers = atoi(argv[3]);
        break;
      case 5:
        PORT = atoi(argv[1]);
        PATH = argv[2];
        num_dispatchers = atoi(argv[3]);
        num_workers = atoi(argv[4]);
        break;
      case 6:
        PORT = atoi(argv[1]);
        PATH = argv[2];
        num_dispatchers = atoi(argv[3]);
        num_workers = atoi(argv[4]);
        dynamic_flag = atoi(argv[5]);
        break;
      case 7:
        PORT = atoi(argv[1]);
        PATH = argv[2];
        num_dispatchers = atoi(argv[3]);
        num_workers = atoi(argv[4]);
        dynamic_flag = atoi(argv[5]);
        queue_length = atoi(argv[6]);
        break;
      case 8:
        PORT = atoi(argv[1]);
        PATH = argv[2];
        num_dispatchers = atoi(argv[3]);
        num_workers = atoi(argv[4]);
        dynamic_flag = atoi(argv[5]);
        queue_length = atoi(argv[6]);
        cache_size = atoi(argv[7]);
        break;

      default:
        printf("usage: %s <port> <path> <num_dispatchers> <num_workers> <dynamic_flag> <queue_length> <cache_size>\n", argv[0]);
        return -1;
    }



  if(PORT < 1025 || PORT > 65535) {
    printf("You may only use ports 1025 - 65535\n");
    return -1;
  }

  if(num_dispatchers < 1 || num_dispatchers > 100){
    printf("num_dispatchers must be between 1-100\n");
    return -1;
  }

  if(num_workers < 1 || num_workers > 100){
    printf("num_workers must be between 1-100\n");
    return -1;
  }

  if(dynamic_flag != 0 && dynamic_flag != 1) {
    printf("The dynamic flag can only be set to 0 (static) or 1 (dynamic)\n");
    return -1;
  }

  if(queue_length < 1 || queue_length > 100){
    printf("queue_length must be between 1-100\n");
    return -1;
  }

  if(cache_size < 1 || cache_size > 100){
    printf("cache_size must be between 1-100\n");
    return -1;
  }

  // Printing arguments *debugging*
  //printf("\nPort: %d\nPath: %s\nNumber of Dispatchers: %d\nNumber of Workers: %d\nDynamic: %d\nQueue Length: %d\nCache Size: %d\n\n", PORT, PATH, num_dispatchers, num_workers, dynamic_flag, queue_length, cache_size);

  // Change the current working directory to server root directory
  if(chdir(PATH) == -1) {
    printf("Server Directory %s does not exist\n", PATH);
  }

  // *Path Debugging Code*
  if(debug == 1){
    printf("Current Path: %s\n", PATH);
  }

  // Start the server and initialize cache
  init(PORT);
  initCache(cache_size);

  // Create request queue
  request_t * requests[queue_length];

  // Create dispatcher and worker threads
  // Init CV and Mutex
  pthread_t dispatcher_thread;
  pthread_t worker_thread;
  pthread_mutex_init(&req_mtx, NULL);
  pthread_mutex_init(&cache_mtx, NULL);
  pthread_cond_init(&wrote_request_cond, NULL);

  // Creating dispatcher threads, create 1 for now
  for(int i = 0; i < num_dispatchers; i++){
    if (pthread_create(&dispatcher_thread,NULL,dispatch,requests) != 0) {
      perror("There was a problem creating dispatcher thread:\n");
    }
  }

  // Creating worker threads, create 1 for now
  for(int i = 0; i < num_workers; i++){
    if (pthread_create(&worker_thread,NULL,worker,requests) != 0) {
  		perror("There was a problem creating worker thread:\n");
  	}
  }

  // Clean up
  pthread_exit(NULL);
  pthread_mutex_destroy(&req_mtx);
  pthread_mutex_destroy(&cache_mtx);
  pthread_mutex_destroy(&log_mtx);
  pthread_cond_destroy(&wrote_request_cond);

  return 0;
}
