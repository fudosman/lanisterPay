# Lannister Pay

## Overview

LannisterPay reached out to help them implement a transaction payment splitting service (TPSS). This service is meant to calculate the amount due to one or more split payment entities as well as the amount left after all splits have been computed.

**Problem Statement:**
Create a NODEJS API service that implements LannisterPay as described below

## Requirement 1

The API should expose a single http Post endpoint
**/split-payment/compute**

_Accepts a transaction object with the following properties:_

- ID
- Amount
- Currency
- CustomerEmail
- SplitInfo: Array of objects with properties(SplitType,SplitValue,SplitEntityId)

successful computation should return

- 200 OK http code
- a single Object containing (ID, Balance, SplitBreakdown)

## example request

```
{
"ID": 13092,
"Amount": 4500,
"Currency": "NGN",
"CustomerEmail": "anon8@customers.io",
"SplitInfo": [
{
"SplitType": "FLAT",
"SplitValue": 450,
"SplitEntityId": "LNPYACC0019"
},
{
"SplitType": "RATIO",
"SplitValue": 3,
"SplitEntityId": "LNPYACC0011"
},
{
"SplitType": "PERCENTAGE",
"SplitValue": 3,
"SplitEntityId": "LNPYACC0015"
},
{
"SplitType": "RATIO",
"SplitValue": 2,
"SplitEntityId": "LNPYACC0016"
},
{
"SplitType": "FLAT",
"SplitValue": 2450,
"SplitEntityId": "LNPYACC0029"
},
{
"SplitType": "PERCENTAGE",
"SplitValue": 10,
"SplitEntityId": "LNPYACC0215"
}
]
};

```