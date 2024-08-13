import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchEvents({ keyword, signal, max }) {
  let url = "http://localhost:3000/events";

  if (keyword && max) {
    url += `?search=${keyword}&max=${max}`;
  } else if (keyword) {
    url += `?search=${keyword}`;
  } else if (max) {
    url += `?max=${max}`;
  }

  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function createNewEvent(eventData) {
  const response = await fetch("http://localhost:3000/events", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while creating the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function fetchSeletableImages({ signal }) {
  const response = await fetch("http://localhost:3000/events/images", {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetch the events images");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}

export async function fetchEvent({ signal, id }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetch the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function deleteEvent({ signal, id }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    signal,
    method: "delete",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while delete the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
}

export async function updateEvent({ event, id }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ event }),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while update the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
}
