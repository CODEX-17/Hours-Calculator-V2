-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 15, 2024 at 03:45 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hours-calculator`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(10) NOT NULL,
  `acct_id` varchar(10) NOT NULL,
  `username` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `acct_id`, `username`) VALUES
(1, '458asdv5', 'Rumar37'),
(4, 'Qzk0KKcE', 'Mar90'),
(10, 'IDixlUY5', 'fad90');

-- --------------------------------------------------------

--
-- Table structure for table `hours`
--

CREATE TABLE `hours` (
  `id` int(11) NOT NULL,
  `acct_id` varchar(10) NOT NULL,
  `date` varchar(15) NOT NULL,
  `morning_start` varchar(10) NOT NULL,
  `morning_end` varchar(10) NOT NULL,
  `afternoon_start` varchar(10) NOT NULL,
  `afternoon_end` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hours`
--

INSERT INTO `hours` (`id`, `acct_id`, `date`, `morning_start`, `morning_end`, `afternoon_start`, `afternoon_end`) VALUES
(20, '458asdv5', '2024-01-29', '08:00', '12:01', '13:01', '17:00'),
(21, '458asdv5', '2024-01-30', '07:10', '12:00', '13:01', '15:11'),
(23, '458asdv5', '2024-01-31', '07:21', '11:40', '13:15', '17:31'),
(24, '458asdv5', '2024-02-01', '08:00', '12:00', '13:01', '17:33'),
(25, '458asdv5', '2024-02-02', '08:07', '12:00', '13:00', '18:06'),
(26, '458asdv5', '2024-02-05', '08:08', '12:01', '13:00', '17:00'),
(27, '458asdv5', '2024-02-06', '08:00', '12:00', '13:01', '18:00'),
(28, '458asdv5', '2024-02-07', '07:00', '12:00', '13:00', '18:00'),
(29, '458asdv5', '2024-02-08', '07:02', '12:00', '13:00', '18:05'),
(30, '458asdv5', '2024-02-12', '07:00', '12:00', '13:00', '18:00'),
(31, '458asdv5', '2024-02-13', '07:00', '12:00', '13:00', '18:00'),
(32, '458asdv5', '2024-02-14', '08:00', '12:00', '13:00', '18:03'),
(33, '458asdv5', '2024-02-15', '07:00', '12:00', '13:00', '18:01'),
(34, '458asdv5', '2024-02-19', '07:02', '12:00', '13:05', '18:00'),
(35, '458asdv5', '2024-02-20', '07:08', '12:00', '13:00', '17:57'),
(36, '458asdv5', '2024-02-21', '07:10', '12:01', '13:00', '18:03'),
(37, '458asdv5', '2024-02-22', '07:05', '12:00', '13:00', '18:16'),
(38, '458asdv5', '2024-02-23', '07:15', '12:00', '13:00', '18:13'),
(39, '458asdv5', '2024-02-26', '08:15', '12:00', '13:00', '18:01'),
(40, '458asdv5', '2024-02-27', '07:00', '12:00', '13:00', '17:36'),
(41, '458asdv5', '2024-02-28', '07:10', '12:01', '13:15', '18:00'),
(42, '458asdv5', '2024-02-29', '07:05', '12:00', '13:00', '18:00'),
(43, '458asdv5', '2024-03-04', '07:10', '12:00', '13:10', '18:01'),
(44, '458asdv5', '2024-03-05', '07:20', '12:01', '13:00', '18:00'),
(45, '458asdv5', '2024-03-06', '08:40', '12:00', '13:00', '16:12'),
(46, '458asdv5', '2024-03-07', '08:30', '12:00', '13:00', '16:30'),
(47, '458asdv5', '2024-03-08', '08:20', '12:10', '13:00', '16:30'),
(48, '458asdv5', '2024-03-11', '08:35', '12:00', '13:00', '16:57'),
(49, '458asdv5', '2024-03-12', '08:25', '12:00', '13:00', '16:39'),
(50, '458asdv5', '2024-03-13', '08:22', '12:00', '13:00', '16:30'),
(51, '458asdv5', '2024-03-14', '08:15', '12:00', '13:00', '16:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hours`
--
ALTER TABLE `hours`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `hours`
--
ALTER TABLE `hours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
