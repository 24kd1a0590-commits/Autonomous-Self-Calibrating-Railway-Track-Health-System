const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    if (!res.ok) return false;
    const data = await res.json();
    return data.status === "online";
  } catch (err) {
    return false;
  }
}

export async function fetchTestImages() {
  try {
    const res = await fetch(`${API_BASE}/api/test-images`);
    if (!res.ok) throw new Error("Failed to fetch test dataset images.");
    const data = await res.json();
    return data.images || [];
  } catch (err) {
    console.error("Failed to load test images:", err);
    return [];
  }
}

export async function inspectImageFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/api/inspect`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({ detail: "Inspection failed." }));
    throw new Error(errJson.detail || `Server error (${res.status}) during inspection.`);
  }

  return await res.json();
}

export async function inspectTestImage(filename) {
  const formData = new FormData();
  formData.append("test_image", filename);

  const res = await fetch(`${API_BASE}/api/inspect`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({ detail: "Inspection failed." }));
    throw new Error(errJson.detail || `Server error (${res.status}) during inspection.`);
  }

  return await res.json();
}
