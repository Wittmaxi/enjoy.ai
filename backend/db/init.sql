DROP DATABASE IF EXISTS audio_files;    

CREATE DATABASE audio_files;    


CREATE TABLE IF NOT EXISTS audio_files (
    featurev BIGINT,
    path BIGINT
);