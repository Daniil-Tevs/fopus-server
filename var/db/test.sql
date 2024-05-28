-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: photography
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,'sadasdasd',1,1);
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (0,'Отменён'),(1,'На рассмотрении'),(2,'Ожидается фотографирование'),(3,'Фотографии в обработке'),(4,'Фотографии готовы к выдаче'),(5,'Финальная проверка'),(6,'Завершён');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
INSERT INTO `people` VALUES (1,'AdminSurname','AdminName','AdminParent','admin@ya.com','$argon2id$v=19$m=65536,t=3,p=4$KDxIn7eThMICOauYCG3HLA$a5xXds9mkzus4MZ5aPoQt9OUjd4LFgOTwKjJpfy74vI',1),(2,'Кишинёв','Николай','Петрович','kish@mail.ru','$argon2id$v=19$m=65536,t=3,p=4$KiuGeYHstJGXJ0qYdKMOXQ$u2geVen8Mjx+zYaWxkSp4HFwyBlLKOKjPhW1Ra6yT3k',2),(3,'Кислый','Пётр','Иванович','kisel@ya.ru','$argon2id$v=19$m=65536,t=3,p=4$KiuGeYHstJGXJ0qYdKMOXQ$u2geVen8Mjx+zYaWxkSp4HFwyBlLKOKjPhW1Ra6yT3k',3),(4,'Петров','Виктор','Евгеньевич','selvik@vik.vik','$argon2id$v=19$m=65536,t=3,p=4$31pP5E+jih3xqlSscTvfkQ$7U3gaxn+3+TUIn7H3kqcMcx6vX/gpeKPGSwnVmWJG6g',2),(5,'Test','Test','Test','test@test.test','$argon2id$v=19$m=65536,t=3,p=4$6AITwpLZb1E0MaPel2VNVw$MqKQDCUY/73B5tuqWOILZMZBQ8b80c8n2h4PKInSgbg',2),(6,'Test','Test','Test','test2@test.test','$argon2id$v=19$m=65536,t=3,p=4$La2ny3xgqo0A4PfcQbF9GA$gt66MGwJVP69/yMHSBCYiF9GpWy8rEZTF+AbHIdin0o',3),(7,'Петрушкина','Великова','Столикова','nik@nik.nik','$argon2id$v=19$m=65536,t=3,p=4$pnlmRH6PguhwgeACO3nBDA$qzxilX3aCt3x4zUGvXw30hu+F8eRQsKidgp6WuXBVEU',3);
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (1,'На паспорт',1,1,1),(2,'Стандарт',1,2,1),(3,'Новая',2,4,0);
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `photo_cost`
--

LOCK TABLES `photo_cost` WRITE;
/*!40000 ALTER TABLE `photo_cost` DISABLE KEYS */;
INSERT INTO `photo_cost` VALUES (2,300,1,2,0),(3,100,2,2,0),(75,100,3,2,0),(76,66,1,2,0),(77,555,3,2,0),(78,666,1,2,0),(79,222,1,2,0),(80,6666,3,2,0),(81,100,2,2,1),(82,100,2,4,0),(83,200,3,4,0),(84,400,1,4,1),(85,200,2,4,1),(86,100,3,4,1),(87,88,1,2,1),(88,699,2,5,0);
/*!40000 ALTER TABLE `photo_cost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `photo_order`
--

LOCK TABLES `photo_order` WRITE;
/*!40000 ALTER TABLE `photo_order` DISABLE KEYS */;
INSERT INTO `photo_order` VALUES (1,600,2,'2024-04-17 00:00:00',NULL,3,2,1,1,2),(2,4000,10,'2024-05-21 00:00:00',NULL,3,2,2,1,6),(4,3200,32,'2024-05-25 00:00:00',NULL,3,2,2,2,0),(5,2100,21,'2024-06-01 00:00:00',NULL,3,2,2,1,1),(6,11300,113,'2024-05-23 00:00:00',NULL,3,2,2,1,1),(7,2400,12,'2024-05-23 00:00:00',NULL,3,4,2,1,0),(8,200,1,'2024-05-24 00:00:00',NULL,7,4,2,3,0),(9,1999800,6666,'2024-05-24 00:00:00',NULL,7,4,1,1,6);
/*!40000 ALTER TABLE `photo_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `photo_size`
--

LOCK TABLES `photo_size` WRITE;
/*!40000 ALTER TABLE `photo_size` DISABLE KEYS */;
INSERT INTO `photo_size` VALUES (1,'3x2'),(2,'4x2'),(4,'10x10'),(5,'15x10'),(6,'15x15'),(7,'10x15');
/*!40000 ALTER TABLE `photo_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Администратор'),(2,'Продавец'),(3,'Покупатель');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `type_paper`
--

LOCK TABLES `type_paper` WRITE;
/*!40000 ALTER TABLE `type_paper` DISABLE KEYS */;
INSERT INTO `type_paper` VALUES (1,'Матовая'),(2,'Глянцевая');
/*!40000 ALTER TABLE `type_paper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `type_speed_order`
--

LOCK TABLES `type_speed_order` WRITE;
/*!40000 ALTER TABLE `type_speed_order` DISABLE KEYS */;
INSERT INTO `type_speed_order` VALUES (1,'Обычная'),(2,'Быстрая'),(3,'Премиум');
/*!40000 ALTER TABLE `type_speed_order` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-29  0:12:33
