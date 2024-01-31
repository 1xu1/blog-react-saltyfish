DROP TABLE IF EXISTS `m_comment`;
CREATE TABLE `m_comment`  (
  `comment_id` int(0) NOT NULL AUTO_INCREMENT,
  `comment_like` int(0) NOT NULL DEFAULT 0,
  `floor` int(0) NOT NULL,
  `blog_id` int(0) NOT NULL,
  `comment_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `comment_user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `comment_link` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `comment_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `user_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;