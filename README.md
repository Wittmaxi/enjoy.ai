# Music Therapy comes alive: enjoy.Ai

![Hero Image](https://github.com/Wittmaxi/enjoy.ai/blob/main/resources/Header.svg)

Enjoy.AI generates music that accompagnies you in every situation of life. 
We envelop you in a **warm cocoon of music** that adapts to your surroundings and helps you in finding your happy-space while helping you focus on your tasks.
Using procedural generation, **we create soundscapes** adapted to your location, the surrounding noise-levels, the weather data, your podometer and your heartbeat.

In order to help you concentrate and in order to help you relieve your anxieties, we coordinate the sensor data to enhance your tune with [Binaural Beats](https://en.wikipedia.org/wiki/Beat_(acoustics)#Binaural_beats) and with subtle sounds of nature. 

## Music Generation

Our first approach was, to generate the music with a deep-learning model. Our first iteration used jukebox from OpenAi to generate songs based on your mood. This approach did not allow for real-time optimization and fell short because of how uncanny the songs could be.
We then opted for generating the music procedurally, assisted by a mood matching unit, which yielded far better results.

Binaural Beats increase concentration, creativity while helping alleviate anxiety.
Based on sensor data and on the "mood" the user enters, different nature sounds are added to the background. These sounds are sounds which are connotated with opsitive emotions and spark recovery in the listener. These sounds contain for example "Fire crackling" or "Rain drops".

![Tech Image](https://github.com/Wittmaxi/enjoy.ai/blob/main/resources/Tech.svg)

## Future

Using the Core-10 questionnaire used in clinical trials, regular checkups on the patient will be done. In order to help each user individually, the machine learning model will be trained individually for each patient.
Based on their feedback, the music would be tweaked to ideally uplift them individually.

```
enjoy.ai
├── backend
│   ├── app.py
│   ├── clients.py
│   ├── db
│   │   ├── config.py
│   │   ├── database.ini
│   │   ├── db_client.py
│   │   ├── __init__.py
│   │   └── init.sql
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── midi
│   │   └── midi_ml.py
│   ├── mood_gen_ml.py
│   ├── requirements.txt
│   ├── safe_install.sh
│   ├── songs
│   │   └── CREMEBRULEE.wav
│   ├── soundfiles
│   │   ├── binaural
│   │   │   ├── binaural_high.wav
│   │   │   └── binaural_low.wav
│   │   └── nature
│   │       ├── birds.wav
│   │       ├── distant_traffic.mp3
│   │       ├── fire.wav
│   │       ├── rain.mp3
│   │       ├── rustling_leaves.mp3
│   │       └── waves.wav
│   ├── steamer
│   │   ├── __init__.py
│   │   └── streaming_client.py
│   ├── util
│   │   ├── generate_audio.py
│   │   ├── __init__.py
│   │   └── merge_audio.py
│   └── weather.py
├── frontend
│   ├── android-manifest.plugin.js
│   ├── App.js
│   ├── app.json
│   ├── assets
│   │   ├── adaptive-icon.png
│   │   ├── favicon.png
│   │   ├── icon.png
│   │   └── splash.png
│   ├── babel.config.js
│   ├── components
│   │   ├── data
│   │   │   ├── Heart.js
│   │   │   └── Shoe.js
│   │   ├── DataDisplay.js
│   │   ├── FancyPlay.js
│   │   ├── FanncyPlayPause.js
│   │   ├── mood_buttons
│   │   │   ├── AnxiousButton.js
│   │   │   ├── HappyButton.js
│   │   │   ├── MotivatedButton.js
│   │   │   ├── SadButton.js
│   │   │   └── SleepyButton.js
│   │   ├── Moods.js
│   │   ├── Player.js
│   │   └── util
│   │       └── Header.js
│   ├── env.js
│   ├── package.json
│   ├── package-lock.json
│   ├── useApi.js
│   ├── useHr.js
│   ├── usePlayAudio.js
│   ├── useSoundLevel.js
│   └── useStepLevels.js
├── README.md
└── resources
    ├── Header.svg
    └── Tech.svg
```
