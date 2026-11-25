-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Creato il: Ott 11, 2024 alle 14:17
-- Versione del server: 8.0.31
-- Versione PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pell_ip_db`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `test_cases`
--

DROP TABLE IF EXISTS `test_cases`;
CREATE TABLE IF NOT EXISTS `test_cases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `test_case_id` varchar(255) NOT NULL,
  `test_description` text,
  `test_number` int DEFAULT NULL,
  `browser_name` varchar(255) DEFAULT NULL,
  `execution_date` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `test_case_steps`
--

DROP TABLE IF EXISTS `test_case_steps`;
CREATE TABLE IF NOT EXISTS `test_case_steps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `test_case_id` int NOT NULL,
  `step_id` varchar(255) NOT NULL,
  `step_description` text,
  `parameters_used` text,
  `execution_time` int DEFAULT NULL,
  `expected_results` text,
  `actual_results` text,
  `pass_fail` tinyint(1) DEFAULT NULL,
  `additional_notes` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `test_case_id` (`test_case_id`)
) ENGINE=InnoDB AUTO_INCREMENT=354 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `test_case_steps`
--
ALTER TABLE `test_case_steps`
  ADD CONSTRAINT `test_case_steps_ibfk_1` FOREIGN KEY (`test_case_id`) REFERENCES `test_cases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
