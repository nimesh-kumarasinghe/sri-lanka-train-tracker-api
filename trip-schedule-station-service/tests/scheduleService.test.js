const scheduleController = require("../controllers/scheduleController");
const scheduleService = require("../services/scheduleService");

jest.mock("../services/scheduleService");

describe("Schedule Controller", () => {
  // Test for getAllSchedules
  describe("getAllSchedules", () => {
    it("should return all schedules", async () => {
      const schedules = [
        {
          id: 1,
          trip_id: "1",
          availability: "available",
          start_time: "10:00",
          end_time: "12:00",
        },
        {
          id: 2,
          trip_id: "2",
          availability: "available",
          start_time: "14:00",
          end_time: "16:00",
        },
      ];
      scheduleService.getAllSchedules.mockResolvedValue(schedules);

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await scheduleController.getAllSchedules(req, res);

      expect(scheduleService.getAllSchedules).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(schedules);
    });

    it("should return 500 if there is a server error", async () => {
      scheduleService.getAllSchedules.mockRejectedValue(
        new Error("Server Error")
      );

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await scheduleController.getAllSchedules(req, res);

      expect(scheduleService.getAllSchedules).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server Error" });
    });
  });

  // Test for getScheduleById
  describe("getScheduleById", () => {
    it("should return schedule details if schedule exists", async () => {
      const schedule = {
        id: 1,
        trip_id: "1",
        availability: "available",
        start_time: "10:00",
        end_time: "12:00",
      };
      scheduleService.getScheduleById.mockResolvedValue(schedule);

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await scheduleController.getScheduleById(req, res);

      expect(scheduleService.getScheduleById).toHaveBeenCalledWith("1");
      expect(res.json).toHaveBeenCalledWith(schedule);
    });

    it("should return 404 if schedule does not exist", async () => {
      scheduleService.getScheduleById.mockResolvedValue(null);

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await scheduleController.getScheduleById(req, res);

      expect(scheduleService.getScheduleById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Schedule not found" });
    });

    it("should return 500 if there is a server error", async () => {
      scheduleService.getScheduleById.mockRejectedValue(
        new Error("Server Error")
      );

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await scheduleController.getScheduleById(req, res);

      expect(scheduleService.getScheduleById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server Error" });
    });
  });

  // Test for createSchedule
  describe("createSchedule", () => {
    it("should create a new schedule", async () => {
      const newSchedule = {
        id: 1,
        trip_id: "1",
        availability: "available",
        start_time: "10:00",
        end_time: "12:00",
      };
      scheduleService.createSchedule.mockResolvedValue(newSchedule);

      const req = {
        body: {
          trip_id: "1",
          availability: "available",
          start_time: "10:00",
          end_time: "12:00",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await scheduleController.createSchedule(req, res);

      expect(scheduleService.createSchedule).toHaveBeenCalledWith(
        "1",
        "available",
        "10:00",
        "12:00"
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newSchedule);
    });

    it("should return 500 if there is a server error", async () => {
      scheduleService.createSchedule.mockRejectedValue(
        new Error("Server Error")
      );

      const req = {
        body: {
          trip_id: "1",
          availability: "available",
          start_time: "10:00",
          end_time: "12:00",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await scheduleController.createSchedule(req, res);

      expect(scheduleService.createSchedule).toHaveBeenCalledWith(
        "1",
        "available",
        "10:00",
        "12:00"
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server Error" });
    });
  });

  // Test for updateSchedule
  describe("updateSchedule", () => {
    it("should update schedule details if schedule exists", async () => {
      const updatedSchedule = {
        id: 1,
        trip_id: "1",
        availability: "updated",
        start_time: "11:00",
        end_time: "13:00",
      };
      scheduleService.updateSchedule.mockResolvedValue(updatedSchedule);

      const req = {
        params: { id: "1" },
        body: {
          availability: "updated",
          start_time: "11:00",
          end_time: "13:00",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await scheduleController.updateSchedule(req, res);

      expect(scheduleService.updateSchedule).toHaveBeenCalledWith("1", {
        availability: "updated",
        start_time: "11:00",
        end_time: "13:00",
      });
      expect(res.json).toHaveBeenCalledWith(updatedSchedule);
    });

    it("should return 404 if schedule does not exist", async () => {
      scheduleService.updateSchedule.mockResolvedValue(null);

      const req = {
        params: { id: "1" },
        body: {
          availability: "updated",
          start_time: "11:00",
          end_time: "13:00",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await scheduleController.updateSchedule(req, res);

      expect(scheduleService.updateSchedule).toHaveBeenCalledWith("1", {
        availability: "updated",
        start_time: "11:00",
        end_time: "13:00",
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Schedule not found" });
    });

    it("should return 500 if there is a server error", async () => {
      scheduleService.updateSchedule.mockRejectedValue(
        new Error("Server Error")
      );

      const req = {
        params: { id: "1" },
        body: {
          availability: "updated",
          start_time: "11:00",
          end_time: "13:00",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await scheduleController.updateSchedule(req, res);

      expect(scheduleService.updateSchedule).toHaveBeenCalledWith("1", {
        availability: "updated",
        start_time: "11:00",
        end_time: "13:00",
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server Error" });
    });
  });

  // Test for deleteSchedule
  describe("deleteSchedule", () => {
    it("should delete a schedule if it exists", async () => {
      scheduleService.deleteSchedule.mockResolvedValue({ affectedRows: 1 });

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await scheduleController.deleteSchedule(req, res);

      expect(scheduleService.deleteSchedule).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Schedule deleted successfully",
      });
    });

    it("should return 404 if schedule does not exist", async () => {
      scheduleService.deleteSchedule.mockResolvedValue({ affectedRows: 0 });

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await scheduleController.deleteSchedule(req, res);

      expect(scheduleService.deleteSchedule).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Schedule not found" });
    });

    it("should return 500 if there is a server error", async () => {
      scheduleService.deleteSchedule.mockRejectedValue(
        new Error("Server Error")
      );

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await scheduleController.deleteSchedule(req, res);

      expect(scheduleService.deleteSchedule).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server Error" });
    });
  });
});
