-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.21-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for crud
CREATE DATABASE IF NOT EXISTS `crud` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `crud`;

-- Dumping structure for table crud.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table crud.users: ~5 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `username`, `password`, `address`) VALUES
	(1, 'rahim', 'rahim@gmail.com', '', '$2b$10$mxXFghO.Rq1/hFThtvovqu5MSq8MRMmsDJtCZC238D.8bZaRDpSRm', 'bangladesh'),
	(7, 'rakesh roy', 'rakesh@gmail.com', '', '$2b$10$LszTA1OGz.ExEv/JIR3kSu1xLR5Y7WlpELMACFztRYtm6s9oRmARy', ''),
	(8, 'rajesh roy', 'rajesh@gmail.com', 'rajeshABc', '$2b$10$A9/PCsoG9qMPFWMtPTqzveDtXaD97se400UQYvRT1bMQKZe16WF6a', ''),
	(9, 'polash roy', 'polash@gmail.com', 'polashyCX', '$2b$10$7RVpGhMjsS0fqude0/d9IuyKa0LQ2pw83dctFizvE2fhi9fQ9h/We', ''),
	(12, 'polash roy kumar', 'polashkumar@gmail.com', 'polashRCM', '$2b$10$/xJ0dBkikx5R3QwNXN1eT.i6Jm/GZJKA0nadQIrve.AW9kYpr/FXG', '');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
