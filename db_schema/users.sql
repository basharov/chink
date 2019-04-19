CREATE TABLE users (
    id SERIAL,

    github_user_id character varying(150),
    github_profile json,

    CONSTRAINT check_git_service_name
       CHECK (primary_git_service_name = 'github')
);
