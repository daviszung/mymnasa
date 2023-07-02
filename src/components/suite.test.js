const { isValidDate, isDateNotAfterToday } = require("./Observatory.jsx")
const request = require("supertest")
const app = require("../../api/index.js")

describe("Validating Dates in Observatory", () => {
  const dateString = new Date("2023-7-1");
  const tooOldDate = new Date("1992-1-1");
  it("validates common date string", () => {
    expect(isValidDate(dateString)).toBe(true)
  })

  it("filters out dates that are too old", () => {
    expect(isValidDate(tooOldDate)).toBe(false)
  })
})

describe('isDateNotAfterTodayFunction', () => {
  it('should return true for dates equal to or before today', () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    expect(isDateNotAfterToday(today)).toBe(true);

    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - 1);
    expect(isDateNotAfterToday(pastDate)).toBe(true);
  });

  it('should return false for dates after today', () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 1);
    expect(isDateNotAfterToday(futureDate)).toBe(false);
  });
});

describe("Making NASA API calls", () => {
  it('should get an image from /api/image', async () => {
    const response = await request(app).post('/api/image').send({selectedDate: "2023-7-1"})
    const data = JSON.parse(response.text)
    expect(response.status).toBe(200);
    expect(data).toBeDefined();
    expect(data).toHaveProperty("url");
    expect(data).toHaveProperty("title");
    expect(data).toHaveProperty("explanation");
  });
});

describe("Signin with username and password", () => {
  it('should return Login Success', async () => {
    const response = await request(app).post('/api/login').send({username: "davis", password: "password"});
    const data = JSON.parse(response.text)
    expect(response.status).toBe(200);
    expect(data).toBeDefined();
    expect(data).toBe("Login Success")
  });
})