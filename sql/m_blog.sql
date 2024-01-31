CREATE TABLE m_blog  (
  blog_id integer NOT NULL PRIMARY KEY,
  blog_content text NULL,
  blog_like integer NOT NULL DEFAULT 0,
  blog_read integer NOT NULL DEFAULT 0,
  blog_visibility integer NOT NULL DEFAULT 1,
  blog_type integer NULL DEFAULT 0,
  blog_title varchar(255) NULL DEFAULT NULL,
  blog_label varchar(255) NULL DEFAULT NULL,
  blog_writer varchar(255) NULL DEFAULT NULL,
  blog_time timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  blog_create_time timestamp(0) NOT NULL,
  blog_writer_id integer NULL DEFAULT NULL
);