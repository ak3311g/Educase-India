import { getPool } from "../config/db.js";

const pool = getPool();

export async function addSchool({ name, address, latitude, longitude }) {
  const result = await pool.query(
    "INSERT INTO school_data (name, address, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, address, latitude, longitude],
  );

  return result.rows[0];
}

export async function getSchool({ lat, lng, radi }) {
  console.log(lat, lng, radi)
  const result = await pool.query(
    `
        SELECT *
FROM (
    SELECT id, name, address, latitude, longitude,
    (
        6371 * acos(
            cos(radians($1)) *
            cos(radians(latitude)) *
            cos(radians(longitude) - radians($2)) +
            sin(radians($1)) *
            sin(radians(latitude))
        )
    ) AS distance
    FROM school_data
    WHERE latitude BETWEEN ($1 - ($3 / 111.0)) AND ($1 + ($3 / 111.0))
      AND longitude BETWEEN ($2 - ($3 / (111.0 * cos(radians($1)))))
                        AND ($2 + ($3 / (111.0 * cos(radians($1)))))
) AS sub
WHERE distance < $3
ORDER BY distance
LIMIT 50;
        `,
    [lat, lng, radi],
  );

  return result.rows;
}
