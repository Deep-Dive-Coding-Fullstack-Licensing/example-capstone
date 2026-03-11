-- this is a comment in SQL (yes, the space is needed!)
-- these statements will drop the tables, DELETE THE DATA and re-add the tables
-- never ever ever ever do this on live data!!!!
DROP TABLE IF EXISTS "like";
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS follow;
DROP TABLE IF EXISTS thread;
DROP TABLE IF EXISTS keyword;
DROP TABLE IF EXISTS profile;

-- create the profile entity
CREATE TABLE IF NOT EXISTS profile (
    -- this creates the attribute for the primary key
    -- UUID is the data type for keys/ids
    -- NOT NULL means the attribute is required!
                                       id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    about VARCHAR(512),
    activation_token CHAR(32),
    -- to make sure duplicate data cannot exist, create a unique index
    email VARCHAR(128) NOT NULL UNIQUE,
    -- to make something optional, exclude the not null
    hash CHAR(97) NOT NULL,
    image_url  VARCHAR(255),
    name VARCHAR(32) NOT NULL UNIQUE
    );

CREATE TABLE IF NOT EXISTS keyword (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(32) NOT NULL UNIQUE
    );

CREATE TABLE IF NOT EXISTS thread (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID NOT NULL REFERENCES profile(id),
    reply_thread_id UUID REFERENCES thread(id) ON DELETE CASCADE,
    content VARCHAR(140) NOT NULL,
    datetime timestamptz NOT NULL DEFAULT NOW(),
    image_url VARCHAR(255)
    );

CREATE TABLE IF NOT EXISTS follow (
    -- this is the profile that is doing the following
    follower_id UUID NOT NULL REFERENCES profile(id),
    -- this is the profile that is being followed
    following_id UUID NOT NULL REFERENCES profile(id),
    PRIMARY KEY(follower_id, following_id)
    );

CREATE TABLE IF NOT EXISTS tag (
    keyword_id UUID NOT NULL REFERENCES keyword(id),
    thread_id UUID NOT NULL REFERENCES thread(id) ON DELETE CASCADE,
    PRIMARY KEY(thread_id, keyword_id)
    );

CREATE TABLE IF NOT EXISTS "like" (
                                      profile_id UUID NOT NULL REFERENCES profile(id),
    thread_id UUID NOT NULL REFERENCES thread(id) ON DELETE CASCADE,
    datetime timestamptz NOT NULL DEFAULT NOW(),
    PRIMARY KEY(profile_id, thread_id)
    );