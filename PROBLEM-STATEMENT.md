# Lannister Pay

## Overview

LannisterPay reached out to help them implement a transaction payment splitting service (TPSS). This service is meant to calculate the amount due to one or more split payment entities as well as the amount left after all splits have been computed.

**Problem Statement:**
Create a NODEJS API service that implements LannisterPay as described below

## Requirement 1

The API should expose a single http Post endpoint 
**/split-payment/compute**

*Accepts a transaction object with the following properties:*

* ID
* Amount
* Currency
* CustomerEmail
* SplitInfo: Array of objects with properties(SplitType,SplitValue,SplitEntityId)

successful computation should return
* 200 OK http code 
* a single Object containing (ID, Balance, SplitBreakdown)