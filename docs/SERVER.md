
## Setting up PM2 on a Linux server

Summary of steps:

1. Setup a user and group called `pm2`,
2. Add all real users to `pm2` group,
3. Export a `PM2_HOME` environment variable,
4. Install `pm2` globally,
5. Creating a `pm2` startup script,
6. Saving the resulting configuration.

```sh
]$ cat /etc/passwd

]$ sudo useradd -d /opt/pm2 -m -s /bin/bash pm2
]$ sudo passwd pm2

]$ sudo usermod -aG pm2 <user 1>
]$ sudo usermod -aG pm2 <user 2>
# ...

]$ sudo touch /etc/profile.d/pm2.sh #
]$ sudo sh -c 'echo "export PM2_HOME=\"/opt/pm2/.pm2\"" > /etc/profile.d/pm2.sh'
]$ source /etc/profile.d/pm2.sh

]$ sudo npm install pm2 -g

]$ sudo /usr/local/bin/pm2 startup -u pm2 --hp /opt/pm2

]$ sudo /usr/local/bin/pm2 start /var/www/survey-bot/index.js --name='survey-bot'

]$ /usr/local/bin/pm2 save

]$ sudo service pm2-pm2 status
]$ sudo service pm2-pm2 restart
]$ sudo service pm2-pm2 reload
]$ sudo service pm2-pm2 stop

]$ cat /etc/passwd | egrep '(pm2|nginx)' #
```

---
## Local `wget` test ##

```sh
]$ wget -vvvO- http://localhost:8008

--2021-06-07 17:17:31--  http://localhost:8008/
Resolving localhost (localhost)... ::1, 127.0.0.1
Connecting to localhost (localhost)|::1|:8008... connected.
HTTP request sent, awaiting response... 200 OK
Length: 2257 (2.2K) [text/html]
Saving to: ‘STDOUT’

-                       0%[                          ]       0  --.-KB/s               <!doctype html><html lang="en"><meta charset="utf-8"><title>Survey-Bot</title>

<meta name="robots" content="noindex, nofollow" />

  …
  …

<main id="webchat" role="main"></main>


<script type="module" src="js/app.js"></script>

</html>
-                     100%[=========================>]   2.20K  --.-KB/s    in 0s      

2021-06-07 17:17:31 (202 MB/s) - written to stdout [2257/2257]
]$

```

## Useful links

* [Stackoverflow :~ How to run PM2 so other users…][how-pm2];
* [PM2 Docs :~ Persistent applications][pm2];

---

[pm2]: https://pm2.keymetrics.io/docs/usage/startup/
  "PM2 - Persistent applications: Startup Script Generator"
[how-pm2]: https://stackoverflow.com/questions/32178443/how-to-run-pm2-so-other-server-users-are-able-to-access-the-process#:~:text=1.%20Create%20user%20PM2
  "StackOverflow: 'How to run pm2 so other server users are able to access the process?'"
