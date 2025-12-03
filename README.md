```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▒░▒░▒░░░▒░▒░▒░▒░▒░░░░░░▒░░▒░▒░▒░░░▒░▒░░░░▒░▒░▒░░▒░▒░▒░░▒▒▒░▒░▒▒▒▒░░
░▒░▒░▒░░▒░▒░▒░▒░▒░▒░▒░▒▒▒▒░▒░▒░▒░░▒░▒░▒░░▒░▒░▒░▒░▒░░▒░░▒░░░░░▒░▒░▒░
░▒░░▒░▒▒▒▒▒▒░░░░▒░▒▒▒▒▒▒░▒░░░░░░▒░▒▒▒▒▒▒▒░░░░▒░░▒░▒▒▒▒▒▒░░▒░░▒░▒░░░
░▒░▒░▒░░▒░▒░▒░▒░▒░▒░▒░▒░░▒░▒░▒░▒░░▒░▒░▒░░▒░▒░▒░░▒░▒░▒░▒░▒░▒░░▒░▒░░░
▒░▒░▒░░░▒░▒░▒░▒░░░▒░░▒░▒░░▒░▒░▒░░▒░▒░▒░░▒░▒░▒░▒░▒░▒░░░░░▒░▒░░▒▒▒▒▒▒
▒▒▒▒▒▒░▒░▒░▒░░▒░▒░▒░░░▒▒▒▒▒▒▒▒░▒░▒░▒░▒░░▒░▒░▒░░▒░▒░▒░░▒░▒░▒░░▒░▒░░░
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
```

# @edo-w/xer
XER is a typescript library for creating structured errors and enchanting error handling.

## Overview
XER library provides a base error class that allows you to create "structured" errors
which capture unique id, time, cause, code, properties, and retry state in a predictable manner. 

This structured error can be easily serialized and restored across process boundaries to aid in 
troubleshooting and resolving issues. 
