CREATE DATABASE  IF NOT EXISTS `advogados-template` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `advogados-template`;
-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: advogados-template
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_23c05c292c439d77b0de816b50` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Ambiental','2024-02-03 18:39:56.507349','2024-02-03 18:39:56.507349');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `process`
--

DROP TABLE IF EXISTS `process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `process` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `process_key` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `matter` varchar(255) DEFAULT NULL,
  `description` text,
  `distribution_date` date DEFAULT NULL,
  `conclusion_date` date DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `status` varchar(30) DEFAULT 'Em Aguardo',
  `is_urgent` tinyint DEFAULT '0',
  `legal_opinion` varchar(255) DEFAULT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `category_id` int unsigned NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_f0145bef0a9a736f1bfd0891e89` (`user_id`),
  KEY `FK_607b1b08f0a5e62ba0bd9578f6f` (`category_id`),
  CONSTRAINT `FK_607b1b08f0a5e62ba0bd9578f6f` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FK_f0145bef0a9a736f1bfd0891e89` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `process`
--

LOCK TABLES `process` WRITE;
/*!40000 ALTER TABLE `process` DISABLE KEYS */;
INSERT INTO `process` VALUES (1,'5','Naruto usocrack','51515151','Naruto usocrack estava traficando drogas','2023-07-19',NULL,'2023-07-26','Em Aguardo',0,NULL,2,1,'2024-02-03 18:40:37.599485','2024-02-03 18:40:37.599485'),(2,'51','Naruto usocrack','51515151','Naruto usocrack estava traficando drogas','2023-07-19',NULL,'2023-07-26','Em Aguardo',0,NULL,2,1,'2024-02-03 18:42:05.048285','2024-02-03 18:42:05.048285');
/*!40000 ALTER TABLE `process` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `process_document`
--

DROP TABLE IF EXISTS `process_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `process_document` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) NOT NULL,
  `content_length` int unsigned NOT NULL,
  `content_type` varchar(255) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `process_id` int unsigned NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_3371dbca8a3c7cac5dc7765e9c9` (`process_id`),
  CONSTRAINT `FK_3371dbca8a3c7cac5dc7765e9c9` FOREIGN KEY (`process_id`) REFERENCES `process` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `process_document`
--

LOCK TABLES `process_document` WRITE;
/*!40000 ALTER TABLE `process_document` DISABLE KEYS */;
/*!40000 ALTER TABLE `process_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revision_request`
--

DROP TABLE IF EXISTS `revision_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revision_request` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `process_id` int unsigned NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_b09a244c7601cfad7ec11be6022` (`process_id`),
  CONSTRAINT `FK_b09a244c7601cfad7ec11be6022` FOREIGN KEY (`process_id`) REFERENCES `process` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revision_request`
--

LOCK TABLES `revision_request` WRITE;
/*!40000 ALTER TABLE `revision_request` DISABLE KEYS */;
INSERT INTO `revision_request` VALUES (1,'Caso Bob Esponja','Eu fiz isso e isso...',1,'2024-02-03 18:41:24.405203','2024-02-03 18:41:24.405203'),(2,'Caso Bob Esponja','Eu fiz isso e isso...',2,'2024-02-03 18:42:22.928496','2024-02-03 18:42:22.928496');
/*!40000 ALTER TABLE `revision_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revision_request_document`
--

DROP TABLE IF EXISTS `revision_request_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revision_request_document` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) NOT NULL,
  `content_length` int unsigned NOT NULL,
  `content_type` varchar(255) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `revision_request_id` int unsigned NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_565e320a732a35f5e732af48201` (`revision_request_id`),
  CONSTRAINT `FK_565e320a732a35f5e732af48201` FOREIGN KEY (`revision_request_id`) REFERENCES `revision_request` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revision_request_document`
--

LOCK TABLES `revision_request_document` WRITE;
/*!40000 ALTER TABLE `revision_request_document` DISABLE KEYS */;
/*!40000 ALTER TABLE `revision_request_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revision_response`
--

DROP TABLE IF EXISTS `revision_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revision_response` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `revision_request_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_93a2db572339f192466f899363f` (`revision_request_id`),
  KEY `FK_9a9c4a837fd0eb7676f9722cfa2` (`user_id`),
  CONSTRAINT `FK_93a2db572339f192466f899363f` FOREIGN KEY (`revision_request_id`) REFERENCES `revision_request` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_9a9c4a837fd0eb7676f9722cfa2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revision_response`
--

LOCK TABLES `revision_response` WRITE;
/*!40000 ALTER TABLE `revision_response` DISABLE KEYS */;
INSERT INTO `revision_response` VALUES (1,'CASO - TESTE','Faça isso e isso..., bla bla bla',1,1,'2024-02-03 18:41:46.197521','2024-02-03 18:41:46.197521'),(2,'CASO - TESTE','Faça isso e isso..., bla bla bla',2,1,'2024-02-03 18:42:29.839450','2024-02-03 18:42:29.839450');
/*!40000 ALTER TABLE `revision_response` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revision_response_document`
--

DROP TABLE IF EXISTS `revision_response_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revision_response_document` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) NOT NULL,
  `content_length` int unsigned NOT NULL,
  `content_type` varchar(255) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `revision_response_id` int unsigned NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_9e4407ae1a4136a8a5d8efc9f06` (`revision_response_id`),
  CONSTRAINT `FK_9e4407ae1a4136a8a5d8efc9f06` FOREIGN KEY (`revision_response_id`) REFERENCES `revision_response` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revision_response_document`
--

LOCK TABLES `revision_response_document` WRITE;
/*!40000 ALTER TABLE `revision_response_document` DISABLE KEYS */;
/*!40000 ALTER TABLE `revision_response_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialty`
--

DROP TABLE IF EXISTS `specialty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialty` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `affinity` int NOT NULL,
  `user_id` int unsigned NOT NULL,
  `category_id` int unsigned NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_e41622242f302b1358721d8f3f0` (`user_id`),
  KEY `FK_6781305046e69b4d273f518fb92` (`category_id`),
  CONSTRAINT `FK_6781305046e69b4d273f518fb92` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_e41622242f302b1358721d8f3f0` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialty`
--

LOCK TABLES `specialty` WRITE;
/*!40000 ALTER TABLE `specialty` DISABLE KEYS */;
/*!40000 ALTER TABLE `specialty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(30) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `nro_oab` varchar(100) DEFAULT NULL,
  `role` varchar(30) DEFAULT 'lawyer',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Matheus','matheus@email.com','73988323232','$2b$10$Vdzp58ltdfYHiDFpH/9OLug5o2FKelprD0Wu1aHYxWJ361VXFjd9G','0123456-7','admin','2024-02-03 18:39:20.779916','2024-02-03 18:39:20.779916'),(2,'Matheus','matheus1@email.com','73988323232','$2b$10$0eR6lW17iAGWjND3RU65T.uBTEkIC/lUMxFuOcr6lE48G9oOw3vLS','0123456-7','lawyer','2024-02-03 18:39:39.656826','2024-02-03 18:39:39.656826');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-03 17:11:39
