async function httpGetPlanets() {
  // TODO: Once API is ready.
  try {
    let response = await fetch("/planets");
    return response.json();
  } catch (e) {
    console.log(e);
  }

  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  try {
    let response = await fetch("/launches");
    return response.json();
  } catch (e) {
    console.log(e);
  }
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  try {
    return await fetch("/launches", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (e) {
    return { ok: false };
  }
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  try {
    return await fetch("/launches" + `/${id}`, {
      method: "delete",
    });
  } catch (e) {
    console.log(e);
    return {
      ok: true,
    };
  }
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
