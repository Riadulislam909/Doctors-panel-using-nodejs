-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2020 at 12:15 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node1`
--

-- --------------------------------------------------------

--
-- Table structure for table `bed`
--

CREATE TABLE `bed` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `word` varchar(100) NOT NULL,
  `bedno` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bed`
--

INSERT INTO `bed` (`id`, `name`, `word`, `bedno`) VALUES
(1, 'a', 'medical', 'm-0011'),
(6, 't', 'Anesthetic', 'A-0001'),
(7, 'tawsif', 'rf', '5555');

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `dname` varchar(200) NOT NULL,
  `number` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `email_status` varchar(100) NOT NULL,
  `department` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `id` int(11) NOT NULL,
  `image` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`dname`, `number`, `email`, `email_status`, `department`, `address`, `password`, `id`, `image`) VALUES
('Mr.A', '017412585200', 'ma@gmail.com', '', 'Orthopedic', 'Dhaka', '12345', 1, ''),
('x', '01741258521', 'x@gmail.com', '', 'Anaesthetics', 'Dhaka', '12345', 1236, ''),
('r', '01741258520', 'r@gmail.com', '', 'Orthopedic', 'Dhaka', '4561', 1237, ''),
('riad12', '123456', 'simantoahmd82@gmail.com', 'verified', 'abcd', 'basundhara', '1234', 1246, 'user-06.jpg'),
('acsdas', '123456', 'john@gmail.com', 'not_verified', 'sdasd', 'sdasdasd', '12345', 1247, 'user-04.jpg'),
('acsdas', '123456', 'john@gmail.com', 'not_verified', 'sdasd', 'sdasdasd', '12345', 1248, 'patient-thumb-02.jpg'),
('acsdas', '123456', 'john@gmail.com', 'not_verified', 'sdasd', 'sdasdasd', '12345', 1249, 'video-call.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `notice`
--

CREATE TABLE `notice` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `message` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notice`
--

INSERT INTO `notice` (`id`, `title`, `message`) VALUES
(2, 'Emergency', 'closed.'),
(4, 'Holiday', 'Today Is holiday');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` int(11) NOT NULL,
  `pname` varchar(100) NOT NULL,
  `number` varchar(100) NOT NULL,
  `problem` varchar(10000) NOT NULL,
  `doctor` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `time` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `pname`, `number`, `problem`, `doctor`, `address`, `time`) VALUES
(13, 'tawsif', '54321', 'emslkks', 'x', 'gfvdcdv', ''),
(14, 'akil', '5412223', 'Assdd', 'Mr.A', 'asasasas', ''),
(15, 'simanto', '123456', 'ndngsnjhj', 'Mr.A', 'jdjs', ''),
(17, 'abidd', '44452', 'Assdd', 'x', 'DHA', ''),
(18, 'zxzxzx', '2112221', 'fdfdfedf', 'x', 'njkasnkjnskj', ''),
(19, 'asas', '54545', 'asansjajjnhshd', 'x', 'jhabsdjhasbhdcaskj', ''),
(20, 'asasasas', '45554656', 'asasasassx', 'riad', 'zxzx', '01:01'),
(21, 'aas', '2121', 'hjuujhih', 'Mr.A', 'bjbjn', '00:55'),
(22, 'xnakjsndkaj', '5454545', 'jhasbjchdbasjkhcb', 'Mr.A', 'sbkhjab', '05:55'),
(23, 'zazaza', '55656565', 'knkjnknkjn', 'riad', 'kjbjbjhbj', '17:25'),
(24, 'JAGHGAUJ', '4544354', 'JOLIJOIJHOIHJ', 'riad', 'JHJHBGHJBGH', '02:05'),
(25, 'cscscs', '5454545454', 'sxdsdcsfds', 'riad12', 'xdsdxs', '02:00'),
(26, 'wdewd', '455515', 'scbsjhcbshb', 'riad12', 'sskjbcdhsb', '02:01');

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

CREATE TABLE `prescription` (
  `id` int(11) NOT NULL,
  `pname` varchar(100) NOT NULL,
  `problem` varchar(500) NOT NULL,
  `prescription` varchar(50000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prescription`
--

INSERT INTO `prescription` (`id`, `pname`, `problem`, `prescription`) VALUES
(1, 'asd', 'Allergies & Asthma.', 'medicine names: ...\r\nTime:....'),
(3, 't', 'Allergies & Asthma.', 'Take Proper Rest'),
(4, 'cscscs', 'dedewfdef', 'rfwwwwwwwwwwwwww35ty435y456y45yt4');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `details` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`id`, `name`, `date`, `details`) VALUES
(1, 'qw', '2019-07-19', 'Operation Details'),
(2, 't', '2019-07-10', 'Emergency');

-- --------------------------------------------------------

--
-- Table structure for table `temp`
--

CREATE TABLE `temp` (
  `id` int(60) NOT NULL,
  `email` varchar(90) NOT NULL,
  `token` varchar(90) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `verify`
--

CREATE TABLE `verify` (
  `id` int(11) NOT NULL,
  `dname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `verify`
--

INSERT INTO `verify` (`id`, `dname`, `email`, `token`) VALUES
(0, 'riad', 'abc@yopmail.com', '4vtusq83'),
(0, 'riad', 'abc@yopmail.com', 'y0o4e2vy'),
(0, 'Riad', 'abcd@yopmail.com', 'q71bolxj'),
(0, 'Riad1', 'abcd@yopmail.com', '6v95u2ef'),
(0, 'riad', 'abcd@yopmail.com', '2virwdmi'),
(0, 'Riad1', 'riadulislam814@gmail.com', '65sl3f43'),
(0, 'Riad1', 'simantoahmd82@gmail.com', 'clcp1gce'),
(0, 'riad12', 'abcde@yopmail.com', 'v79vcjkr'),
(0, 'riad12', 'simantoahmd82@gmail.com', 'odf3nryq'),
(0, 'acsdas', 'john@gmail.com', 'szkitnxh');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bed`
--
ALTER TABLE `bed`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notice`
--
ALTER TABLE `notice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `temp`
--
ALTER TABLE `temp`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bed`
--
ALTER TABLE `bed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1250;

--
-- AUTO_INCREMENT for table `notice`
--
ALTER TABLE `notice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `prescription`
--
ALTER TABLE `prescription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `temp`
--
ALTER TABLE `temp`
  MODIFY `id` int(60) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
