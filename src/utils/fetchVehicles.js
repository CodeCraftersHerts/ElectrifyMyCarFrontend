const VEHICLE_API_URL = "https://vehicle-locator-mongdodb.onrender.com/api/vehicles";

export async function fetchVehicles() {
  try {
    const res = await fetch(VEHICLE_API_URL);
    const json = await res.json();
    if (json && json.data) {
      return json.data;
    }
    return [];
  } catch (err) {
    console.error("Error fetching vehicles:", err);
    return [];
  }
}

// Optional: a version just for warming up (no data usage)
export async function warmUpVehicleAPI() {
  try {
    await fetch(VEHICLE_API_URL);
  } catch (err) {
    console.warn("Vehicle API warm-up failed:", err);
  }
}
