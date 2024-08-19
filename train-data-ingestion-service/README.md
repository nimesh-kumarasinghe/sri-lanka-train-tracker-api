# Data Ingestion Service

## Overview

The **Data Ingestion Service** is a microservice designed to handle incoming real-time data from IoT devices (e.g., trains). It processes the data, applies reverse geocoding to convert latitude and longitude into a human-readable location name, and stores the processed data in a MongoDB database. This service forms part of a train tracking system that provides real-time location, speed, and other relevant data.

### Key Features:

- Receives real-time data from IoT devices.
- Validates incoming data to ensure correct format.
- Applies reverse geocoding to convert latitude/longitude to a location name.
- Stores processed data in MongoDB.
- Supports future integration with additional services.

### Incoming Data Format:

The service expects the following structure for incoming data:

```json
{
  "iotDeviceId": "string",
  "location": {
    "latitude": "float",
    "longitude": "float"
  },
  "speed": "float",
  "timestamp": "ISO8601 timestamp",
  "signalStrength": "float"
}
```
