const { updateLocationData } = require("../services/locationService");
const Location = require("../models/locationModel");
const axios = require("axios");

jest.mock("axios");
jest.mock("../models/locationModel");

describe("updateLocationData", () => {
  const mockData = {
    iotDeviceId: "device123",
    location: { lat: 12.34, long: 56.78 },
    speed: 80,
    timestamp: "2023-08-23T10:00:00Z",
    signalStrength: 4,
    locationName: "Station A",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update an existing location if iotDeviceId exists", async () => {
    // Mock the Location.findOne method to return an existing location
    const existingLocation = {
      save: jest.fn(),
    };
    Location.findOne.mockResolvedValue(existingLocation);

    await updateLocationData(mockData);

    // Verify the location was updated and saved
    expect(existingLocation.location).toEqual(mockData.location);
    expect(existingLocation.speed).toEqual(mockData.speed);
    expect(existingLocation.timestamp).toEqual(mockData.timestamp);
    expect(existingLocation.signalStrength).toEqual(mockData.signalStrength);
    expect(existingLocation.locationName).toEqual(mockData.locationName);
    expect(existingLocation.save).toHaveBeenCalled();
  });

  it("should insert a new location if iotDeviceId does not exist", async () => {
    // Mock the Location.findOne method to return null (no existing location)
    Location.findOne.mockResolvedValue(null);

    // Mock the axios calls to return sample data
    axios.get.mockImplementation((url) => {
      if (url.includes("/engine-trains/")) {
        return Promise.resolve({ data: { train_id: "train123" } });
      } else if (url.includes("/trains/")) {
        return Promise.resolve({
          data: { train_name: "Express", route_id: "route123" },
        });
      } else if (url.includes("/routes/")) {
        return Promise.resolve({
          data: { start_station: "Station A", end_station: "Station B" },
        });
      } else if (url.includes("/trip-trains/")) {
        return Promise.resolve({
          data: { trip_id: "trip123", trip_type: "express", duration: "2h" },
        });
      } else if (url.includes("/schedules/trip/")) {
        return Promise.resolve({
          data: {
            availability: "high",
            start_time: "08:00",
            end_time: "10:00",
          },
        });
      } else if (url.includes("/trip-stations/")) {
        return Promise.resolve({
          data: [{ station_id: "station123" }],
        });
      } else if (url.includes("/stations/")) {
        return Promise.resolve({
          data: {
            station_name: "Station C",
            latitude: 12.34,
            longitude: 56.78,
          },
        });
      }
      return Promise.reject(new Error("Unexpected URL"));
    });

    // Mock the Location.save method
    const newLocation = {
      save: jest.fn(),
    };
    Location.mockImplementation(() => newLocation);

    await updateLocationData(mockData);

    // Verify the new location was created and saved
    expect(Location).toHaveBeenCalledWith({
      iotDeviceId: mockData.iotDeviceId,
      location: mockData.location,
      speed: mockData.speed,
      timestamp: mockData.timestamp,
      signalStrength: mockData.signalStrength,
      locationName: mockData.locationName,
      trainName: "Express",
      startStationName: "Station A",
      endStationName: "Station B",
      tripType: "express",
      duration: "2h",
      availability: "high",
      startTime: "08:00",
      endTime: "10:00",
      stations: [
        {
          stationName: "Station C",
          latitude: 12.34,
          longitude: 56.78,
        },
      ],
    });
    expect(newLocation.save).toHaveBeenCalled();
  });

  it("should throw an error if any API call fails", async () => {
    // Mock Location.findOne to return null
    Location.findOne.mockResolvedValue(null);

    // Mock axios.get to throw an error
    axios.get.mockRejectedValue(new Error("API error"));

    await expect(updateLocationData(mockData)).rejects.toThrow(
      "Error updating location data"
    );
  });
});
