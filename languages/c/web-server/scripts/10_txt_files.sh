#!/bin/bash
for (( x=0; x<30; x++ ));
 do
  i=$(shuf -i 1-25 -n 1)
  wget -O/dev/null -q 127.0.0.1:1337/testing/text/html/$i.html
 done
