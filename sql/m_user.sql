CREATE TABLE m_user  (
  user_id integer NOT NULL PRIMARY KEY,
  user_name varchar(255) NULL DEFAULT NULL,
  user_pwd varchar(255) NULL DEFAULT NULL,
  user_head varchar(255) NULL DEFAULT NULL,
  user_link varchar(255) NULL DEFAULT NULL,
  user_gender integer NULL DEFAULT NULL,
  user_permission varchar(255) NULL DEFAULT NULL,
  user_email varchar(255) NULL DEFAULT NULL,
  register_time timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0)
)