DROP TABLE IF EXISTS `m_like`;
CREATE TABLE `m_like`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `uid` int(0) NULL DEFAULT NULL COMMENT '用户id',
  `blog_id` int(0) NULL DEFAULT NULL COMMENT '博文id',
  `like_time` timestamp(0) NULL DEFAULT NULL,
  `like_num` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;