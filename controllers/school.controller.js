import * as SchoolService from "../services/school.services.js";

export async function addSchool(req, res) {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: "Input all data" });
  }

  try {
    const result = await SchoolService.addSchool({
      name,
      address,
      latitude,
      longitude,
  });
    res.json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "[SCL] Internal Server Error" });
  }
}

export async function getSchools(req, res) {
  const lat = req.query.lat;
  const lng = req.query.lng;
  const radi = req.query.radi;

  try {
    const result = await SchoolService.getSchool({lat, lng, radi});

    if (!result) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "[SCL] Internal Server Error" });
  }
}
