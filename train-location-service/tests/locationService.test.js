const Location = require("../models/locationModel");
const axios = require("axios");
const { updateLocationData } = require("../services/locationService"); // Replace with the actual path to the function file

jest.mock("axios");
jest.mock("../models/locationModel");

describe("updateLocationData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update existing location data when iotDeviceId exists", async () => {
    const mockData = {
      iotDeviceId: "device123",
      location: "some_location",
      speed: 60,
      timestamp: "2023-08-01T12:00:00Z",
      signalStrength: "strong",
      locationName: "Test Location",
    };

    const mockExistingLocation = {
      save: jest.fn(),
      location: "",
      speed: 0,
      timestamp: "",
      signalStrength: "",
      locationName: "",
    };

    Location.findOne.mockResolvedValue(mockExistingLocation);

    await updateLocationData(mockData);

    expect(Location.findOne).toHaveBeenCalledWith({ iotDeviceId: "device123" });
    expect(mockExistingLocation.location).toBe(mockData.location);
    expect(mockExistingLocation.speed).toBe(mockData.speed);
    expect(mockExistingLocation.timestamp).toBe(mockData.timestamp);
    expect(mockExistingLocation.signalStrength).toBe(mockData.signalStrength);
    expect(mockExistingLocation.locationName).toBe(mockData.locationName);
    expect(mockExistingLocation.save).toHaveBeenCalled();
  });

  it("should insert new location data when iotDeviceId does not exist", async () => {
    const mockData = {
      iotDeviceId: "device456",
      location: "new_location",
      speed: 80,
      timestamp: "2023-08-01T13:00:00Z",
      signalStrength: "moderate",
      locationName: "New Location",
    };

    Location.findOne.mockResolvedValue(null);

    // Mock the axios requests
    axios.get
      .mockResolvedValueOnce({ data: { train_id: "train123" } }) // engineRes
      .mockResolvedValueOnce({
        data: { train_name: "Train A", route_id: "route123" },
      }) // trainRes
      .mockResolvedValueOnce({
        data: { start_station: "Station A", end_station: "Station B" },
      }) // routeInfoRes
      .mockResolvedValueOnce({
        data: { trip_id: "trip123", trip_type: "express", duration: "2h" },
      }) // tripRes
      .mockResolvedValueOnce({
        data: {
          availability: "available",
          start_time: "08:00",
          end_time: "10:00",
        },
      }) // scheduleRes
      .mockResolvedValueOnce({ data: [{ station_id: "station123" }] }) // tripStationRes
      .mockResolvedValueOnce({
        data: { station_name: "Station X", latitude: 12.34, longitude: 56.78 },
      }); // stationRes

    const mockNewLocation = {
      save: jest.fn(),
    };
    Location.mockImplementation(() => mockNewLocation);

    await updateLocationData(mockData);

    expect(axios.get).toHaveBeenCalledTimes(7);
    expect(Location).toHaveBeenCalledWith(
      expect.objectContaining({
        iotDeviceId: mockData.iotDeviceId,
        location: mockData.location,
        speed: mockData.speed,
        timestamp: mockData.timestamp,
        signalStrength: mockData.signalStrength,
        locationName: mockData.locationName,
      })
    );
    expect(mockNewLocation.save).toHaveBeenCalled();
  });

  it("should throw an error when axios request fails", async () => {
    const mockData = {
      iotDeviceId: "device789",
      location: "another_location",
      speed: 100,
      timestamp: "2023-08-01T14:00:00Z",
      signalStrength: "weak",
      locationName: "Another Location",
    };

    Location.findOne.mockResolvedValue(null);

    axios.get.mockRejectedValue(new Error("Network Error"));

    await expect(updateLocationData(mockData)).rejects.toThrow(
      "Error updating location data"
    );

    expect(axios.get).toHaveBeenCalled();
    expect(Location).not.toHaveBeenCalled();
  });
});
