# enjoy.ai Flask Back-end

`enjoy.ai Flask Back-end` contains a short summary of how to use the service


## How to start

Docker compose

```sh
$ cd backend
$ docker-compose up
```

## API Usage
The backend exposes a simple workflow based on setting up sessions, and tweaking parameters for ongoing sessions.
For setting up a new session, pass all data using a `POST` request to `/request_audio`. The response will contain a uuid where the generated sound will be streamed.
The stream can be accessed from `/stream<uuid>`

To tweak the generated audio, additional or updated data can again be sent to `/request_audio`, but by including the existing uuid the stream will be updated if nneded instead of creating a new one.

## Structure
The backend consist of a server communcating with all clients, a database for storing impoertant personalized sessions, a mood engine for requesting the data from the alst part, the sound generation. 

### User sessions
Each user gets their own unique session when connecting to be able to recieve the perfect sound for exactly them.

### Mood engine for personalisation using SVM
Based on the user data from the client, additional data sources such as weather data the mood engine tunes the parameters individually for each user.The mood engine could further be expanded to contain a feedback loop from the user to continuosly improve and revise the its output.

### Sound generation
Based on the parameters the sound generation combines binaural beats, natural sounds (emotional acoustic association) and purely generated tones, combined into optimal sound for every occasion. The generation is soft-realtime and can keep up with quick changes in the desires of the users. 
