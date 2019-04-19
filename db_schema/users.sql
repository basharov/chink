CREATE TABLE users (
    id SERIAL,

    github_user_id character varying(150),
    github_profile json
);
