-- ----------------------------
--  Table structure for `books`
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `isbn` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci,
  `alt` varchar(100) COLLATE utf8mb4_unicode_ci,
  `publisher` varchar(100) COLLATE utf8mb4_unicode_ci,
  `price` varchar(100) COLLATE utf8mb4_unicode_ci,
  `rating` float COLLATE utf8mb4_unicode_ci,
  `author` varchar(100) COLLATE utf8mb4_unicode_ci,
  `summary` varchar(2048) COLLATE utf8mb4_unicode_ci,
  `count` int COLLATE utf8mb4_unicode_ci DEFAULT 0,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='图书信息';
